using Domain.Models.Rmq;
using Infrastructure.RmqClient;
using Infrastructure.Services;

namespace RmqSubscriber
{
    public class SubscriberWorker : IWorker
    {
        private readonly IRmqSubscriber<Bundle<RmqMessage>> _rmqSubscriber;
        private readonly ISubscriber _subscriber;

        public SubscriberWorker(IRmqSubscriber<Bundle<RmqMessage>> rmqSubscriber, ISubscriber subscriber)
        {
            _rmqSubscriber = rmqSubscriber;
            _subscriber = subscriber;
        }

        public void Start()
        {
        }

        public void Work()
        {
            _rmqSubscriber.Subscribe(_subscriber.DoSmt);
        }

        public void Stop()
        {
            _rmqSubscriber.Dispose();
        }
    }
}
