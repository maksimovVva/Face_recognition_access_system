using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using BizRules.Department;
using Domain.Models;

namespace FaceRecognition.Controllers
{
    [RoutePrefix("api/departments")]
    public class DepartmentsController : ApiController
    {
        private readonly IDepartmentBizRules departmentBizRules;

        public DepartmentsController(IDepartmentBizRules departmentBizRules)
        {
            this.departmentBizRules = departmentBizRules;
        }

        [HttpGet]
        public async Task<IEnumerable<DictionaryItem>> Load()
        {
            return await departmentBizRules.GetAll();
        }
    }
}