using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models;
using Infrastructure.DataAccess;

namespace DataAccess.EmployeeStatus
{
    public class EmployeeStatusRepository : IEmployeeStatusRepository
    {
        public async Task<IEnumerable<DictionaryItem>> GetAll(ISession session)
        {
            const string query = @"
SELECT Id, Name
FROM dbo.Status
";
            return await session.QueryAsync<DictionaryItem>(query);
        }
    }
}
