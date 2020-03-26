using System;
using log4net;
using RabbitMQ.Client;

namespace Infrastructure.RmqClient
{
    public class RmqConnectionOwner : IDisposable
    {
        private readonly ILog logger;

        protected IConnection Connection { get; private set; }

        public RmqConnectionOwner(string connectionString)
        {
            logger = LogManager.GetLogger(GetType().Name);
            var factory = new ConnectionFactory { Uri = new Uri(connectionString), AutomaticRecoveryEnabled = true, TopologyRecoveryEnabled = true };
            Connection = factory.CreateConnection();

            Connection.RecoverySucceeded += ConnectionRecoverySucceeded;
            Connection.ConnectionShutdown += ConnectionShutdown;
        }

        private void ConnectionShutdown(object sender, ShutdownEventArgs e)
        {
            logger.Warn($"Received connection shutdown event from Rmq. Details:{e}");
        }

        private void ConnectionRecoverySucceeded(object sender, EventArgs e)
        {
            logger.Info($"Received recovery succeeded event from Rmq.");
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposing) return;

            Connection?.Close();
            Connection = null;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
