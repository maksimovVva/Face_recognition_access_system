namespace Domain.Exception
{
    public class FileSizeException : System.Exception
    {
        public FileSizeException(string fullName, long size, string message) : base(message)
        {
            FullName = fullName;
            Size = size;
        }

        public string FullName { get; }
        public long Size { get; }
    }
}
