using BizRules;
using Castle.Windsor;
using Castle.MicroKernel.Registration;
using Domain.Models.Rmq;
using Infrastructure.RmqClient;
using Infrastructure.Services;

namespace RmqSubscriber
{
    public class DependencyInstaller : BaseDependencyInstaller
    {
        protected override void CustomInstall(IWindsorContainer container)
        {
            // worker
            container.Register(
                Component.For<SubscriberService>().LifeStyle.Singleton,
                Component.For<IWorker>().ImplementedBy<SubscriberWorker>().LifeStyle.Singleton);

            // external dependencies
            container.Register(
                Component.For<IRmqSubscriber<Bundle<RmqMessage>>>().UsingFactoryMethod(CreateRmqSubscriber).LifeStyle.Singleton);

            // local dependencies
            container.Register(
                Component.For<ISubscriber>().ImplementedBy<Subscriber>().LifeStyle.Singleton);
        }

        private IRmqSubscriber<Bundle<RmqMessage>> CreateRmqSubscriber()
        {
            return new RmqSubscriber<Bundle<RmqMessage>>("amqp://guest:guest@localhost", "test");
        }
    }
}
