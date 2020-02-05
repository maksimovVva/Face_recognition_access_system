using System.Web.Http;

namespace FaceRecognition.Controllers
{
    [RoutePrefix("api/employees")]
    public class EmployeesController : ApiController
    {
        [HttpGet]
        [Route("id")]
        public int Get(int id)
        {
            return id;
        }
    }
}