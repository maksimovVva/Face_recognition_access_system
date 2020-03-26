using System;
using System.Collections.Generic;

namespace Infrastructure.RmqClient
{
    public interface IErrorHandlingStrategy
    {
        bool ExecuteWithErrorHandling<T>(Action<T, IDictionary<string, object>> messageHandler, T message, IDictionary<string, object> headers);
    }
}
