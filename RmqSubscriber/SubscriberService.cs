using Infrastructure.Services;

namespace RmqSubscriber
{
    [System.ComponentModel.DesignerCategory("Code")]
    public class SubscriberService : ServiceBaseExt
    {
        public const string ServiceNamePrefix = "FaceControl.RmqSubscriber";

        public SubscriberService(IWorker worker)
            : base(worker)
        {
        }

        protected override string GetServiceNamePrefix()
        {
            return ServiceNamePrefix;
        }
    }
}