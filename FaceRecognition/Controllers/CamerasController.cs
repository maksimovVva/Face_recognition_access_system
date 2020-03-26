using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using BizRules.Camera;
using Domain.Models;

namespace FaceRecognition.Controllers
{
    [RoutePrefix("api/cameras")]
    public class CamerasController:ApiController
    {
        private readonly ICameraBizRules cameraBizRules;

        public CamerasController(ICameraBizRules cameraBizRules)
        {
            this.cameraBizRules = cameraBizRules;
        }

        [HttpGet]
        public async Task<IEnumerable<CameraView>> Load()
        {
            return await cameraBizRules.GetAll();
        }
    }
}