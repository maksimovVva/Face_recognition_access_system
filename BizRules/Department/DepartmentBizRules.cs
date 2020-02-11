using System.Collections.Generic;
using System.Threading.Tasks;
using DataAccess.Department;
using Domain.Models;
using Infrastructure.DataAccess;

namespace BizRules.Department
{
    public class DepartmentBizRules : IDepartmentBizRules
    {
        private readonly IDepartmentRepository departmentRepository;
        private readonly ISessionFactory sessionFactory;

        public DepartmentBizRules(IDepartmentRepository departmentRepository, ISessionFactory sessionFactory)
        {
            this.departmentRepository = departmentRepository;
            this.sessionFactory = sessionFactory;
        }

        public async Task<IEnumerable<DictionaryItem>> GetAll()
        {
            using (var session = sessionFactory.CreateForEmployee())
            {
                return await departmentRepository.GetAll(session);
            }
        }
    }
}
