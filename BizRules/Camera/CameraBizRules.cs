using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.Camera;
using Domain.Models;
using Domain.Models.DbModels;
using Infrastructure.DataAccess;

namespace BizRules.Camera
{
    class CameraBizRules : ICameraBizRules
    {
        private readonly ICameraRepository cameraRepository;
        private readonly ISessionFactory sessionFactory;

        public CameraBizRules(ICameraRepository cameraRepository, ISessionFactory sessionFactory)
        {
            this.cameraRepository = cameraRepository;
            this.sessionFactory = sessionFactory;
        }

        public async Task<IEnumerable<CameraView>> GetAll()
        {
            using (var session = sessionFactory.CreateForEmployee())
            {
                var cameras = await cameraRepository.GetAll(session);
                return cameras.Select(MapToView);
            }
        }

        public CameraView Get(int id)
        {
            using (var session = sessionFactory.CreateForEmployee())
            {
                return MapToView(cameraRepository.Get(session, id));
            }
        }

        public async Task<IEnumerable<CameraView>> Get(IEnumerable<int> ids)
        {
            using (var session = sessionFactory.CreateForEmployee())
            {
                return (await cameraRepository.Get(session, ids)).Select(MapToView);
            }
        }

        private CameraView MapToView(CameraDbObject dbObject)
        {
            return new CameraView
            {
                Id = dbObject.Id,
                Name = dbObject.Name,
                Url = dbObject.Url,
                SecurityLevelId = dbObject.SecurityLevelId
            };
        }

    }
}
