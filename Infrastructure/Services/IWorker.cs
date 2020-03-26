namespace Infrastructure.Services
{
    public interface IWorker
    {
        void Start();

        void Work();

        void Stop();
    }
}
