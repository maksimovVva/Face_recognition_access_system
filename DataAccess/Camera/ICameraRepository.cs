using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models.DbModels;
using Infrastructure.DataAccess;

namespace DataAccess.Camera
{
    public interface ICameraRepository
    {
        Task<IEnumerable<CameraDbObject>> GetAll(ISession session);
        CameraDbObject Get(ISession session, int id);
        Task<IEnumerable<CameraDbObject>> Get(ISession session, IEnumerable<int> ids);
    }
}
