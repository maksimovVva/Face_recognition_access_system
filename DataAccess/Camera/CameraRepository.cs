using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Models.DbModels;
using Infrastructure.DataAccess;

namespace DataAccess.Camera
{
    public class CameraRepository : ICameraRepository
    {
        public async Task<IEnumerable<CameraDbObject>> GetAll(ISession session)
        {
            const string query = @"
SELECT Id, Name, Url, SecurityLevelId
FROM dbo.Camera
";
            return await session.QueryAsync<CameraDbObject>(query);
        }

        public CameraDbObject Get(ISession session, int id)
        {
            const string query = @"
SELECT Id, Name, Url, SecurityLevelId
FROM dbo.Camera
WHERE Id = @id";

            return session.Query<CameraDbObject>(query, new { id }).FirstOrDefault();
        }

        public async Task<IEnumerable<CameraDbObject>> Get(ISession session, IEnumerable<int> ids)
        {
            const string query = @"
SELECT Id, Name, Url, SecurityLevelId
FROM dbo.Camera
WHERE Id IN @ids";

            return await session.QueryAsync<CameraDbObject>(query, new { ids });
        }
    }
}
