using System.Collections.Generic;
using System.Threading.Tasks;
using DataAccess.EmployeeStatus;
using Domain.Models;
using Infrastructure.DataAccess;

namespace BizRules.EmployeeStatus
{
    public class EmployeeStatus : IEmployeeStatus
    {
        private readonly ISessionFactory sessionFactory;
        private readonly IEmployeeStatusRepository statusRepository;

        public EmployeeStatus(ISessionFactory sessionFactory,
            IEmployeeStatusRepository statusRepository)
        {
            this.sessionFactory = sessionFactory;
            this.statusRepository = statusRepository;
        }

        public async Task<IEnumerable<DictionaryItem>> GetAll()
        {
            using (var session = sessionFactory.CreateForEmployee())
            {
                return await statusRepository.GetAll(session);
            }
        }
    }
}
