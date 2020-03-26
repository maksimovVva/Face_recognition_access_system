using System.Collections.Generic;
using Domain.Models.Rmq;

namespace RmqSubscriber
{
    public interface ISubscriber
    {
        void DoSmt(Bundle<RmqMessage> message, IDictionary<string, object> headers);
    }
}
