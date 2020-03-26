using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using BizRules.SecurityLevel;
using Domain.Models;

namespace FaceRecognition.Controllers
{
    [RoutePrefix("api/securityLevels")]
    public class SecurityLevelsController : ApiController
    {
        private readonly ISecurityLevel securityLevelBizRules;

        public SecurityLevelsController(ISecurityLevel securityLevelBizRules)
        {
            this.securityLevelBizRules = securityLevelBizRules;
        }

        [HttpGet]
        public async Task<IEnumerable<DictionaryItem>> Load()
        {
            return await securityLevelBizRules.GetAll();
        }
    }
}