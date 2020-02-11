using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models;
using Domain.Models.DbModels;
using Infrastructure.DataAccess;

namespace DataAccess.SecurityLevel
{
    public interface ISecurityLevelRepository
    {
        Task<IEnumerable<DictionaryItem>> GetByEmployeeId(ISession session, int id);
        Task<IEnumerable<DictionaryItem>> GetAll(ISession session);
        Task<IEnumerable<SecurityLevelWithEmployee>> GetWithEmployees(ISession session, IEnumerable<int> ids);
        Task<IEnumerable<KeyValuePair<int, int>>> GetAllEmployeesLevelRelations(ISession session);
    }
}
