using System;
using System.Collections.Generic;
using System.Text;
using Infrastructure.Extensions;
using log4net;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Newtonsoft.Json;

namespace Infrastructure.RmqClient
{
    public class RmqSubscriber<T> : RmqConnectionOwner, IRmqSubscriber<T>
    {
        private readonly ILog logger = LogManager.GetLogger(typeof(RmqSubscriber<>));

        private IModel channel;

        private readonly string queueName;

        private readonly IErrorHandlingStrategy errorHandlingStrategy;

        private bool isDisposed;

        private bool isSubscribed;

        public RmqSubscriber(string connectionString, string queueName, IErrorHandlingStrategy errorHandlingStrategy = null)
            : base(connectionString)
        {
            this.queueName = queueName;
            this.errorHandlingStrategy = errorHandlingStrategy ?? new ErrorHandlingStrategy();
        }

        public void Subscribe(Action<T, IDictionary<string, object>> messageHandler)
        {
            if (isDisposed)
            {
                throw new ObjectDisposedException(nameof(RmqSubscriber<T>));
            }
            if (isSubscribed)
            {
                throw new InvalidOperationException("Calling Subscribe more than once is prohibited.");
            }

            EnsureChannel();
            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += (sender, eventArgs) => ConsumerReceived(eventArgs, messageHandler);
            channel.BasicConsume(queueName, false, consumer);
            isSubscribed = true;
            logger.Info($"Listening rmq queue {queueName}");
        }

        protected override void Dispose(bool disposing)
        {
            if (isDisposed)
            {
                return;
            }

            isDisposed = true;
            channel?.Close();
            channel = null;

            base.Dispose(disposing);
        }

        private void EnsureChannel()
        {
            if (channel != null) return;

            channel = Connection.CreateModel();
            channel.BasicQos(0, 1, false);  // Setting prefetch to 1 message, no size limit, global:false - locally for particular consumer channel
        }

        private void ConsumerReceived(BasicDeliverEventArgs e, Action<T, IDictionary<string, object>> messageHandler)
        {
            var msgBody = string.Empty;
            try
            {
                msgBody = Encoding.UTF8.GetString(e.Body);
                var message = JsonConvert.DeserializeObject<T>(msgBody);
                var succeeded = errorHandlingStrategy.ExecuteWithErrorHandling(
                    messageHandler,
                    message,
                    e.BasicProperties.Headers);

                if (succeeded)
                    channel.BasicAck(e.DeliveryTag, false);
                else
                    channel.BasicNack(e.DeliveryTag, false, true);
            }
            catch (JsonSerializationException jse)
            {
                logger.Error($"JsonSerializationException has occured when deserializing a message from rmq: {msgBody.Truncate(50)}.. {jse.StackTrace}");
                channel.BasicNack(e.DeliveryTag, false, false);
            }
            catch (JsonReaderException jre)
            {
                logger.Error($"JsonReaderException has occured when deserializing a message from rmq: {msgBody.Truncate(50)}.. {jre.StackTrace}");
                channel.BasicNack(e.DeliveryTag, false, false);
            }
            catch (Exception ex)
            {
                logger.Error("Unhandled exception when processing a message from rmq", ex);
                channel.BasicNack(e.DeliveryTag, false, true);
            }
        }
    }
}
