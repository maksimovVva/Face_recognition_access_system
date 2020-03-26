using System;
using System.Collections.Generic;

namespace Infrastructure.RmqClient
{
    public interface IRmqSubscriber<out T> : IDisposable
    {
        void Subscribe(Action<T, IDictionary<string, object>> messageHandler);
    }
}
