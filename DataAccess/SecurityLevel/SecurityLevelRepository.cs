using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models;
using Domain.Models.DbModels;
using Infrastructure.DataAccess;

namespace DataAccess.SecurityLevel
{
    public class SecurityLevelRepository : ISecurityLevelRepository
    {
        public async Task<IEnumerable<DictionaryItem>> GetByEmployeeId(ISession session, int id)
        {
            const string query = @"
SELECT s.Id as [Id], s.Name as Name
FROM dbo.EmployeeLevelRelation e
LEFT JOIN dbo.SecurityLevel s ON s.EmployeeId = e.Id
WHERE e.Id = @id
";
            return await session.QueryAsync<DictionaryItem>(query, new { id });
        }

        public async Task<IEnumerable<DictionaryItem>> GetAll(ISession session)
        {
            const string query = @"
SELECT Id, Name
FROM dbo.SecurityLevel
";
            return await session.QueryAsync<DictionaryItem>(query);
        }

        public async Task<IEnumerable<SecurityLevelWithEmployee>> GetWithEmployees(ISession session, IEnumerable<int> ids)
        {
            const string query = @"
SELECT s.Id as SecurityLevelId, s.Name as SecurityLevelName, e.EmployeeId as EmployeeId
FROM dbo.EmployeeLevelRelation e
LEFT JOIN dbo.SecurityLevel s ON s.EmployeeId = e.Id
WHERE e.Id IN @ids
";

            return await session.QueryAsync<SecurityLevelWithEmployee>(query, new { ids });
        }

        public Task<IEnumerable<KeyValuePair<int, int>>> GetAllEmployeesLevelRelations(ISession session)
        {
            throw new System.NotImplementedException();
        }
    }
}
