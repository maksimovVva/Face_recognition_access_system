using Infrastructure.Helpers;
using log4net;
using log4net.Config;

namespace Infrastructure.Logging
{
    public class LogConfigurator
    {
        public static void Configure()
        {
            GlobalContext.Properties["applicationName"] = ApplicationProperties.GetApplicationName();
            GlobalContext.Properties["applicationKey"] = ApplicationProperties.GetApplicationKey();

            //XmlConfigurator.Configure();
        }
    }
}
