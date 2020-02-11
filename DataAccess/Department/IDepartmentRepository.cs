using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models;
using Infrastructure.DataAccess;

namespace DataAccess.Department
{
    public interface IDepartmentRepository
    {
        Task<IEnumerable<DictionaryItem>> GetAll(ISession session);
    }
}
