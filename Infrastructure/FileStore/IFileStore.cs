using System.IO;

namespace Infrastructure.FileStore
{
    public interface IFileStore
    {
        string FolderName { get; }

        Stream Get(string filePath);

        string Save(Stream content, string fileName);

        string Save(string content, string fileName);

        void Delete(string relativePath);
    }
}
