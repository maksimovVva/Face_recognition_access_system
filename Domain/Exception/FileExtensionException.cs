namespace Domain.Exception
{
    public class FileExtensionException : System.Exception
    {
        public FileExtensionException(string message) : base(message)
        {
        }

        public static bool InsideOf(System.Exception exception)
        {
            return exception != null &&
                   exception.InnerException != null &&
                   exception.InnerException.InnerException != null &&
                   exception.InnerException.InnerException.GetType() == typeof(FileExtensionException);
        }

        public static string GetMessageFrom(System.Exception exception)
        {
            if (InsideOf(exception))
                return exception.InnerException.InnerException.Message;

            return null;
        }
    }
}
