using System;
using System.Collections.Generic;
using System.Threading;
using Infrastructure.Helpers;
using log4net;

namespace Infrastructure.RmqClient
{
    public class ErrorHandlingStrategy : IErrorHandlingStrategy
    {
        private readonly ILog logger = LogManager.GetLogger(typeof(ErrorHandlingStrategy));

        public bool ExecuteWithErrorHandling<T>(Action<T, IDictionary<string, object>> messageHandler, T message, IDictionary<string, object> headers)
        {
            try
            {
                messageHandler(message, headers);
                return true;
            }
            catch (OperationCanceledException)
            {
                logger.Info("Ошибка OperationCanceledException во время обработки сообщения из rmq");
            }
            catch (Exception ex)
            {
                logger.Error("Ошибка во время обработки сообщения из rmq", ex);

                var waitAfterErrorSeconds = Config.GetInt("WaitAfterErrorSeconds", 30);

                Thread.Sleep(TimeSpan.FromSeconds(waitAfterErrorSeconds));
            }

            return false;
        }
    }
}
