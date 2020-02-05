using System.Data;

namespace Infrastructure.DataAccess
{
    public interface ISessionFactory
    {
        ISession CreateForEmployee(bool createTransaction = false, IsolationLevel isolationLevel = IsolationLevel.ReadUncommitted);
    }
}
