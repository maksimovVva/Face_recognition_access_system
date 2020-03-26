using System;
using System.IO;
using Domain.Exception;

namespace Domain.Models.Requests
{
    public class EmployeeRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public DateTime BirthdayDate { get; set; }
        public DateTime PassDate { get; set; }
        public bool IsTemporary { get; set; }
        public string AdditionalDocsPath { get; set; }
        public string PngPath { get; set; }
        public int DepartmentId { get; set; }
        public byte[] LogoImage { get; set; }

        public void AddLogoFile(string localImageFileName)
        {
            if (string.IsNullOrWhiteSpace(localImageFileName) == false)
            {
                LogoImage = GetBytes(localImageFileName);
            }
        }

        private static readonly int megabytes = 1048576;
        private static byte[] GetBytes(string localFileName)
        {
            var fileInfo = new FileInfo(localFileName);

            if (2 * megabytes <= fileInfo.Length)
                throw new FileSizeException(localFileName, fileInfo.Length, "Большой размер файла");

            using (var fileStream = File.OpenRead(localFileName))
            using (var binaryReader = new BinaryReader(fileStream))
            {
                var bytes = binaryReader.ReadBytes((int)fileStream.Length);
                return bytes;
            }
        }
    }
}
