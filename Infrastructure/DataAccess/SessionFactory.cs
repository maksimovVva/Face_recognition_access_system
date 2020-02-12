using System;
using System.Data;
using System.Data.SqlClient;
using Infrastructure.Helpers;

namespace Infrastructure.DataAccess
{
    public class SessionFactory : ISessionFactory
    {
        private string connectionApplicationName;

        private string ConnectionApplicationName
        {
            get
            {
                if (connectionApplicationName == null)
                    connectionApplicationName = Environment.MachineName + "_FaceRecognition";

                return connectionApplicationName;
            }
        }
        public ISession CreateForEmployee(bool createTransaction = false,
            IsolationLevel isolationLevel = IsolationLevel.ReadUncommitted)
        {
            return CreateFor("Employee", createTransaction, isolationLevel);
        }

        private ISession CreateFor(string key, bool createTransaction, IsolationLevel isolationLevel, int? userId = null)
        {
            var connectionString = Config.GetConnectionString(key);
            var connectionStringBuilder = new SqlConnectionStringBuilder(connectionString);
            if (string.Compare(connectionStringBuilder.ApplicationName, ".NET SqlClient Data Provider", StringComparison.InvariantCultureIgnoreCase) == 0)
                connectionStringBuilder.ApplicationName = ConnectionApplicationName;

            var connection = new SqlConnection(connectionStringBuilder.ConnectionString);
            connection.Open();

            SqlTransaction transaction = null;
            if (createTransaction)
                transaction = connection.BeginTransaction(isolationLevel);

            var result = new Session(connection, transaction, userId);
            return result;
        }
    }
}
