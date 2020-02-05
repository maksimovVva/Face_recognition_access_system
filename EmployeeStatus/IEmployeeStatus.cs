using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models;

namespace BizRules.EmployeeStatus
{
    public interface IEmployeeStatus
    {
        Task<IEnumerable<DictionaryItem>> GetAll();
    }
}
