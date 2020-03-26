using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models.DbModels;
using Infrastructure.DataAccess;

namespace DataAccess.Employee
{
    public interface IEmployeeRepository
    {
        void Create(ISession session, EmployeeDbObject employee);

        void Update(ISession session,
            int id,
            string firstName,
            string lastName,
            string middleName,
            DateTime birthday,
            DateTime lastStatusChangedDate,
            DateTime PassDate,
            bool isTemporary,
            string additionalDocsPath,
            string pngPath,
            int departmentId);

        void Delete(ISession session, int id);

        void DeleteSecurityLevels(ISession session, int employeeId);

        EmployeeDbObject Get(ISession session, int id);

        Task<IEnumerable<EmployeeDbObject>> Get(ISession session, IEnumerable<int> ids);

        Domain.Models.Employee.Employee GetEmployee(int id);

        IEnumerable<EmployeeDbObject> Load(ISession session, int skip, int take);
    }
}
