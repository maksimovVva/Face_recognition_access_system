using Castle.Windsor;
using Infrastructure.Logging;
using log4net;

namespace RmqSubscriber
{
    static class Program
    {
        private static ILog logger;

        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        /// 
        static void Main(string[] args)
        {
            log4net.Config.XmlConfigurator.Configure();
            LogConfigurator.Configure();

            var container = BuildContainer();

            var service = container.Resolve<SubscriberService>();
            logger = LogManager.GetLogger("logger");
            logger.ErrorFormat("error");
            service.Start();
        }

        private static IWindsorContainer BuildContainer()
        {
            var container = new WindsorContainer();
            container.Install(new DependencyInstaller());

            return container;
        }
    }
}
