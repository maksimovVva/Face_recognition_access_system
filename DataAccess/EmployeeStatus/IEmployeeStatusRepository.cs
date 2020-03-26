using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models;
using Infrastructure.DataAccess;

namespace DataAccess.EmployeeStatus
{
    public interface IEmployeeStatusRepository
    {
        Task<IEnumerable<DictionaryItem>> GetAll(ISession session);
    }
}
