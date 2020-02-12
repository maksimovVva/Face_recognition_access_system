using System;
using System.Configuration;
using System.Threading;

namespace Infrastructure.Services
{
    public class Runner
    {
        private readonly IWorker _worker;
        private Thread _workerThread;
        private readonly int _waitAfterStopSeconds;


        public Runner(IWorker worker)
        {
            _worker = worker;
            _waitAfterStopSeconds = Convert.ToInt32(ConfigurationManager.AppSettings["WaitAfterStopSeconds"]);
        }

        public void Start()
        {
            _worker.Start();
            _workerThread = new Thread(Run);
            _workerThread.Start();
        }

        public void Stop()
        {
            _worker.Stop();
            _workerThread.Join(TimeSpan.FromSeconds(_waitAfterStopSeconds));
        }

        private void Run()
        {
            try
            {
                _worker.Work();
            }
            catch (Exception ex)
            {
                // при вызове из WindowsService exception приведет к остановке сервиса
                throw ex;
            }
        }
    }
}