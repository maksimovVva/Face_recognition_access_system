using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using BizRules.Employee;
using Domain.Models.Employee;
using Domain.Models.Requests;

namespace FaceRecognition.Controllers
{
    [RoutePrefix("api/employees")]
    public class EmployeesController : ApiController
    {
        private readonly IEmployeeBizRules employeeBizRules;

        public EmployeesController(IEmployeeBizRules employeeBizRules)
        {
            this.employeeBizRules = employeeBizRules;
        }

        [HttpPost]
        [Route("load")]
        public Task<IEnumerable<EmployeeView>> Load(EmployeeLoadRequest request)
        {
            return employeeBizRules.Load(request);
        }

        [HttpDelete]
        [Route("{id}")]
        public void Test([FromUri]int id)
        {
            employeeBizRules.Delete(id);
        }

        [HttpGet]
        [Route("id")]
        public async Task<EmployeeView> Get(int id)
        {
            return await employeeBizRules.GetAsync(id);
        }

        [HttpPut]
        [Route("{id}")]
        public void Update([FromUri] int id, [FromBody] EmployeeRequest request)
        {
            employeeBizRules.Update(id, request);
        }
    }
}