using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Infrastructure.DataAccess
{
    public interface ISession : IDisposable
    {
        IEnumerable<T> Query<T>(string sql, object param = null, bool buffered = true, CommandType? commandType = null, int? commandTimeout = null);

        Task<IEnumerable<T>> QueryAsync<T>(string sql, object param = null, bool buffered = true, CommandType? commandType = null, int? commandTimeout = null);

        int Execute(string sql, object param = null, CommandType? commandType = null, int? commandTimeout = null);

        Task<int> ExecuteAsync(string sql, object param = null, int? commandTimeout = null, CommandType? commandType = null);

        void Commit();

        void Rollback();
    }
}
