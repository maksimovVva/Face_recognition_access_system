using System.Collections.Generic;
using System.Linq;
using Domain.Models.Rmq;
using log4net;

namespace RmqSubscriber
{
    public class Subscriber : ISubscriber
    {
        private readonly ILog logger;

        public Subscriber()
        {
            logger = LogManager.GetLogger("logger");
        }

        public void DoSmt(Bundle<RmqMessage> message, IDictionary<string, object> headers)
        {
            //if (logger.IsInfoEnabled)
            //{
            //    var headersLog = string.Join(", ", headers.Select(e => $"{e.Key}='{e.Value.FromByteArrayToString()}'"));
            //    logger.InfoFormat("Received {0} posts for processing. Metadata={1}", message.Items.Length, headersLog);
            //}

            //var timer = Stopwatch.StartNew();

            logger.InfoFormat(string.Join(", ", message.Items.Select(x => x.Data)));

        }
    }
}
