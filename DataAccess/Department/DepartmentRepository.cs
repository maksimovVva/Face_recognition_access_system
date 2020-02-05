using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models;
using Infrastructure.DataAccess;

namespace DataAccess.Department
{
    public class DepartmentRepository : IDepartmentRepository
    {
        public async Task<IEnumerable<DictionaryItem>> GetAll(ISession session)
        {
            const string query = @"
SELECT Id, Name
FROM dbo.Department
";
            return await session.QueryAsync<DictionaryItem>(query);
        }
    }
}
