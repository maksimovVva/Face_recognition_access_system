using System;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Text;

namespace Infrastructure.Helpers
{
    public static class Config
    {
        public static string GetString(string key, bool strict = true)
        {
            try
            {
                var result = ConfigurationManager.AppSettings[key];

                if (result == null && strict)
                    throw GetConfigException(key, null);

                return result;
            }
            catch (Exception exc)
            {
                throw GetConfigException(key, exc);
            }
        }

        public static int GetInt(string key)
        {
            try
            {
                var stringResult = ConfigurationManager.AppSettings[key];

                if (stringResult == null)
                    throw GetConfigException(key, null);

                var result = Convert.ToInt32(ConfigurationManager.AppSettings[key]);
                return result;
            }
            catch (Exception exc)
            {
                throw GetConfigException(key, exc);
            }
        }

        public static TimeSpan GetTimeSpan(string key, TimeSpan defaultValue)
        {
            try
            {
                var stringResult = ConfigurationManager.AppSettings[key];

                if (stringResult == null)
                    return defaultValue;

                var result = TimeSpan.Parse(stringResult);
                return result;
            }
            catch (Exception exc)
            {
                throw GetConfigException(key, exc);
            }
        }

        public static string[] GetTokens(string key)
        {
            try
            {
                var stringResult = ConfigurationManager.AppSettings[key];

                var result = stringResult?.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries).Select(s => s.Trim()).ToArray();

                return result;
            }
            catch (Exception exc)
            {
                throw GetConfigException(key, exc);
            }
        }

        public static int[] GetIntCollection(string key)
        {
            try
            {
                var stringResult = ConfigurationManager.AppSettings[key];

                var result = stringResult?.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries).Select(s => int.Parse(s.Trim())).ToArray();

                return result;
            }
            catch (Exception exc)
            {
                throw GetConfigException(key, exc);
            }
        }

        public static string[] GetStringCollection(string key)
        {
            try
            {
                var stringResult = ConfigurationManager.AppSettings[key];

                var result = stringResult?.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries).Select(s => s.Trim()).ToArray();

                return result;
            }
            catch (Exception exc)
            {
                throw GetConfigException(key, exc);
            }
        }

        public static int GetInt(string key, int defaultValue)
        {
            try
            {
                var stringResult = ConfigurationManager.AppSettings[key];

                if (stringResult == null) return defaultValue;

                var result = Convert.ToInt32(ConfigurationManager.AppSettings[key]);
                return result;
            }
            catch (Exception exc)
            {
                throw GetConfigException(key, exc);
            }
        }

        public static bool GetBool(string key)
        {
            try
            {
                var stringResult = ConfigurationManager.AppSettings[key];

                if (stringResult == null)
                    throw GetConfigException(key, null);

                var result = Convert.ToBoolean(ConfigurationManager.AppSettings[key]);
                return result;
            }
            catch (Exception exc)
            {
                throw GetConfigException(key, exc);
            }
        }

        public static bool GetBool(string key, bool defaultValue)
        {
            try
            {
                var stringResult = ConfigurationManager.AppSettings[key];
                var result = stringResult != null ? Convert.ToBoolean(ConfigurationManager.AppSettings[key]) : defaultValue;
                return result;
            }
            catch (Exception exc)
            {
                throw GetConfigException(key, exc);
            }
        }

        public static DateTime GetDate(string key)
        {
            try
            {
                var stringResult = ConfigurationManager.AppSettings[key];

                if (stringResult == null)
                    throw GetConfigException(key, null);

                var result = DateTime.ParseExact(stringResult, "yyyyMMdd", CultureInfo.InvariantCulture);
                return result;
            }
            catch (Exception exc)
            {
                throw GetConfigException(key, exc);
            }
        }

        public static long GetLong(string key)
        {
            try
            {
                var stringResult = ConfigurationManager.AppSettings[key];

                if (stringResult == null)
                    throw GetConfigException(key, null);

                var result = Convert.ToInt64(ConfigurationManager.AppSettings[key]);
                return result;
            }
            catch (Exception exc)
            {
                throw GetConfigException(key, exc);
            }
        }

        public static string GetConnectionString(string key)
        {
            try
            {
                var result = ConfigurationManager.ConnectionStrings[key];

                if (result == null || ConfigurationManager.ConnectionStrings[key].ConnectionString == null)
                    throw GetConfigException(key, null);

                return result.ConnectionString;
            }
            catch (Exception exc)
            {
                throw GetConfigException(key, exc);
            }
        }

        private static Exception GetConfigException(string key, Exception innerException)
        {
            var result = new ConfigurationErrorsException(
                string.Format("Not found or cannot parse {0} key from appSettings or connectionStrings of config", key), innerException);
            return result;
        }

        public static string GetTextConfig()
        {
            var result = new StringBuilder();
            result.AppendLine("ConnectionStrings");
            foreach (ConnectionStringSettings connectionString in ConfigurationManager.ConnectionStrings)
            {
                result.AppendLine(string.Format(@"Name=""{0}"" Value=""{1}""", connectionString.Name, connectionString.ConnectionString));
            }

            result.AppendLine("AppSettings");
            foreach (string appKey in ConfigurationManager.AppSettings.Keys)
            {
                result.AppendLine(string.Format(@"Key=""{0}"" Value=""{1}""", appKey, ConfigurationManager.AppSettings[appKey]));
            }

            return result.ToString();
        }

        public static void Reload()
        {
            ConfigurationManager.RefreshSection("appSettings");
        }
    }
}
