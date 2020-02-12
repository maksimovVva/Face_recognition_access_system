using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.ServiceProcess;

namespace Infrastructure.Services
{
    [System.ComponentModel.DesignerCategory("Code")]
    public class ServiceBaseExt : ServiceBase
    {
        private readonly IEnumerable<IWorker> workers;
        private IEnumerable<Runner> runners;

        public ServiceBaseExt(IWorker worker) : this(new[] { worker })
        {
        }

        public ServiceBaseExt(IEnumerable<IWorker> workers)
        {
            this.workers = workers;
            ServiceName =
                GetServiceNamePrefix() + "_subscriberService_"; //ConfigurationManager.AppSettings["ApplicationKey"] ?? string.Empty;
        }

        protected virtual string GetServiceNamePrefix() { return "Unknown"; }

        protected override void OnStart(string[] args)
        {
            AppDomain.CurrentDomain.UnhandledException += DomainUnhandledException;

            try
            {
                runners = workers.Select(worker => new Runner(worker)).ToList();
                runners.ForEach(runner => runner.Start());
            }
            catch (Exception ex)
            {
                OnStop();
            }
        }

        private void DomainUnhandledException(object sender, UnhandledExceptionEventArgs e)
        {
            AppDomain.CurrentDomain.UnhandledException -= DomainUnhandledException;

            OnStop();
        }

        protected override void OnStop()
        {
            runners.ForEach(runner =>
            {
                try
                {
                    runner.Stop();
                }
                catch (Exception e)
                {
                    throw e;
                }
            });
        }

        public void Start()
        {
            if (Environment.UserInteractive)
                OnStart(null);
            else
                Run(this);
        }
    }
}
