using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models;

namespace BizRules.SecurityLevel
{
    public interface ISecurityLevel
    {
        Task<IEnumerable<DictionaryItem>> GetAll();
    }
}
