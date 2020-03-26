using System;
using System.Configuration;
using System.Linq;
using System.Reflection;

namespace Infrastructure.Helpers
{
    public static class ApplicationProperties
    {
        private static readonly string assemblyName;

        static ApplicationProperties()
        {
            assemblyName = GetAssemblyName();
        }

        public static string GetApplicationName()
        {
            var applicationName = ConfigurationManager.AppSettings["ApplicationName"];
            if (applicationName != null) return applicationName;

            return assemblyName;
        }

        public static string GetApplicationKey()
        {
            return ConfigurationManager.AppSettings["ApplicationKey"] ?? string.Empty;
        }

        private static string GetAssemblyName()
        {
            var assembly = GetStartupAssembly() ?? Assembly.GetEntryAssembly();
            if (assembly == null)
            {
                throw new Exception($"You should specify startup assembly by {typeof(StartupAttribute)}.");
            }

            var result = assembly.GetName().Name;
            return result;
        }

        private static Assembly GetStartupAssembly()
        {
            var assemblies = AppDomain.CurrentDomain.GetAssemblies().Where(a => !a.GlobalAssemblyCache && !a.IsDynamic);
            var startupAssembly = assemblies.FirstOrDefault(a => Attribute.IsDefined(a, typeof(StartupAttribute)));

            return startupAssembly;
        }
    }

}
