using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using BizRules.EmployeeStatus;
using DataAccess.EmployeeStatus;
using Domain.Models;

namespace FaceRecognition.Controllers
{
    [RoutePrefix("api/status")]
    public class StatusController: ApiController
    {
        private readonly IEmployeeStatus employeeStatusBizRules;

        public StatusController(IEmployeeStatus employeeStatusBizRules)
        {
            this.employeeStatusBizRules = employeeStatusBizRules;
        }

        [HttpGet]
        public async Task<IEnumerable<DictionaryItem>> Load()
        {
            return await employeeStatusBizRules.GetAll();
        }
    }
}