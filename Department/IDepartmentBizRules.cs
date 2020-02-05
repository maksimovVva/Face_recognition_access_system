using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models;

namespace BizRules.Department
{
    public interface IDepartmentBizRules
    {
        Task<IEnumerable<DictionaryItem>> GetAll();
    }
}
