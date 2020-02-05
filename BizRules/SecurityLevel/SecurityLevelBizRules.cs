using System.Collections.Generic;
using System.Threading.Tasks;
using DataAccess.SecurityLevel;
using Domain.Models;
using Infrastructure.DataAccess;

namespace BizRules.SecurityLevel
{
    public class SecurityLevelBizRules : ISecurityLevel
    {
        private readonly ISecurityLevelRepository securityLevelRepository;
        private readonly ISessionFactory sessionFactory;

        public SecurityLevelBizRules(ISecurityLevelRepository securityLevelRepository, ISessionFactory sessionFactory)
        {
            this.securityLevelRepository = securityLevelRepository;
            this.sessionFactory = sessionFactory;
        }

        public async Task<IEnumerable<DictionaryItem>> GetAll()
        {
            using (var session = sessionFactory.CreateForEmployee())
            {
                return await securityLevelRepository.GetAll(session);
            }
        }
    }
}
