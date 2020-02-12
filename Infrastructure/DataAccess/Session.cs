using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using Infrastructure.Helpers;

namespace Infrastructure.DataAccess
{
    public class Session : ISession
    {
        private readonly IDbConnection connection;
        private readonly IDbTransaction transaction;

        private readonly int defaultTimeout;
        private readonly int? userId;

        public Session(IDbConnection connection, IDbTransaction transaction, int? userId = null)
        {
            this.connection = connection;
            this.transaction = transaction;

            this.defaultTimeout = Config.GetInt("CommandTimeout", 300);
            this.userId = userId;
        }

        public IEnumerable<T> Query<T>(string sql, object param, bool buffered, CommandType? commandType, int? commandTimeout)
        {
            sql = ResolveUserTables(sql);
            return connection.Query<T>(sql, param, transaction, buffered, commandTimeout ?? defaultTimeout, commandType);
        }

        public Task<IEnumerable<T>> QueryAsync<T>(string sql, object param, bool buffered, CommandType? commandType, int? commandTimeout)
        {
            sql = ResolveUserTables(sql);
            return connection.QueryAsync<T>(sql, param, transaction, commandTimeout ?? defaultTimeout, commandType);
        }

        public int Execute(string sql, object param, CommandType? commandType, int? commandTimeout)
        {
            sql = ResolveUserTables(sql);

            return connection.Execute(sql, param, transaction, commandTimeout ?? defaultTimeout, commandType);
        }

        public Task<int> ExecuteAsync(string sql, object param, int? commandTimeout, CommandType? commandType)
        {
            sql = ResolveUserTables(sql);
            return connection.ExecuteAsync(sql, param, transaction, commandTimeout ?? defaultTimeout, commandType);
        }

        public void Commit()
        {
            if (transaction == null)
                throw new ApplicationException("Транзакция не инициализированна");

            transaction.Commit();
        }

        public void Rollback()
        {
            if (transaction == null)
                throw new ApplicationException("Транзакция не инициализированна");

            transaction.Rollback();
        }

        public void Dispose()
        {
            transaction?.Dispose();
            connection.Dispose();
        }

        private string ResolveUserTables(string sql)
        {
            if (userId.HasValue)
            {
                sql = sql.Replace("Aggregates_", "Aggregates_" + userId);
                sql = sql.Replace("PostTags_", "PostTags_" + userId);
                sql = sql.Replace("TopTerms_", "TopTerms_" + userId);
            }

            return sql;
        }

    }
}
