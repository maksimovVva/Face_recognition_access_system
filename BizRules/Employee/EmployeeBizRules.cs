using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.Employee;
using DataAccess.SecurityLevel;
using Domain.Models;
using Domain.Models.DbModels;
using Domain.Models.Employee;
using Domain.Models.Requests;
using Infrastructure.DataAccess;

namespace BizRules.Employee
{
    public class EmployeeBizRules : IEmployeeBizRules
    {
        private readonly IEmployeeRepository employeeRepository;
        private readonly ISecurityLevelRepository securityLevelRepository;

        private readonly ISessionFactory sessionFactory;

        public EmployeeBizRules(
            IEmployeeRepository employeeRepository,
            ISessionFactory sessionFactory,
            ISecurityLevelRepository securityLevelRepository)
        {
            this.employeeRepository = employeeRepository;
            this.sessionFactory = sessionFactory;
            this.securityLevelRepository = securityLevelRepository;
        }

        public void Create(EmployeeRequest request)
        {
            using (var session = sessionFactory.CreateForEmployee(true))
            {
                try
                {
                    var now = DateTime.Now;
                    var dbObject = new EmployeeDbObject
                    {
                        FirstName = request.FirstName,
                        LastName = request.LastName,
                        MiddleName = request.MiddleName,
                        BirthdayDate = request.BirthdayDate,
                        PassDate = request.PassDate,
                        IsTemporary = request.IsTemporary,
                        AdditionalDocsPath = request.AdditionalDocsPath,
                        PngPath = request.PngPath,
                        DepartmentId = request.DepartmentId
                    };

                    employeeRepository.Create(
                        session,
                        dbObject);

                    session.Commit();
                }
                catch (SqlException)
                {
                    session.Rollback();
                    throw;
                }
            }
        }

        public void Update(int id, EmployeeRequest request)
        {
            using (var session = sessionFactory.CreateForEmployee(true))
            {
                try
                {
                    var utcNow = DateTime.UtcNow;

                    employeeRepository.Update(
                        session,
                        id,
                        request.FirstName,
                        request.LastName,
                        request.MiddleName,
                        request.BirthdayDate,
                        request.PassDate,
                        DateTime.Now,
                        request.IsTemporary,
                        request.AdditionalDocsPath,
                        request.PngPath,
                        request.DepartmentId);

                    session.Commit();
                }
                catch (SqlException)
                {
                    session.Rollback();
                    throw;
                }
            }
        }

        public async void Update(IEnumerable<EmployeeView> employees)
        {
            using (var session = sessionFactory.CreateForEmployee(true))
            {
                var dbObjects = employees.Select(MapToDbObject);
                foreach (var employeeDbObject in dbObjects)
                {
                    employeeRepository.Update(session,
                         employeeDbObject.Id,
                         employeeDbObject.FirstName,
                         employeeDbObject.LastName,
                         employeeDbObject.MiddleName,
                         employeeDbObject.BirthdayDate,
                         employeeDbObject.LastChangedStatusDate,
                         employeeDbObject.PassDate,
                         employeeDbObject.IsTemporary,
                         employeeDbObject.AdditionalDocsPath,
                         employeeDbObject.PngPath,
                         employeeDbObject.DepartmentId);
                }
            }
        }

        public void Delete(int id)
        {
            using (var session = sessionFactory.CreateForEmployee())
            {
                employeeRepository.DeleteSecurityLevels(session, id);
                employeeRepository.Delete(session, id);
            }
        }

        public async Task<EmployeeView> GetAsync(int id)
        {
            using (var session = sessionFactory.CreateForEmployee())
            {
                var employeeDb = employeeRepository.Get(session, id);
                var securityLevels = await securityLevelRepository.GetByEmployeeId(session, id);

                return MapToView(employeeDb, securityLevels);
            }
        }

        public async Task<IEnumerable<EmployeeView>> GetAsync(IEnumerable<int> ids)
        {
            using (var session = sessionFactory.CreateForEmployee())
            {
                var securityLevels = await securityLevelRepository.GetWithEmployees(session, ids);
                return (await employeeRepository.Get(session, ids)).Select(x => MapToView(x,
                    securityLevels.Where(y => y.EmployeeId == x.Id).Select(y => new DictionaryItem
                    { Id = y.SecurityLevelId, Name = y.SecurityLevelName })));
            }
        }

        public IEnumerable<EmployeeView> GetAsync(LoadEmployeeRequest request)
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<EmployeeView>> Load(EmployeeLoadRequest request)
        {
            using (var session = sessionFactory.CreateForEmployee())
            {
                var securityLevels = await securityLevelRepository.GetAllEmployeesLevelRelations(session);

                return employeeRepository.Load(session,
                    request.Skip,
                    request.Take).Select(x => MapToView(x, securityLevels.Where(y => y.Key == x.Id).Select(y => new DictionaryItem { Id = y.Key, Name = y.Value.ToString() })));
            }
        }

        private EmployeeView MapToView(EmployeeDbObject dbObject, IEnumerable<DictionaryItem> securityLevels)
        {
            return new EmployeeView
            {
                Id = dbObject.Id,
                FirstName = dbObject.FirstName,
                LastName = dbObject.LastName,
                MiddleName = dbObject.MiddleName,
                BirthdayDate = dbObject.BirthdayDate,
                IsTemporary = dbObject.IsTemporary,
                Department = new DictionaryItem { Id = dbObject.DepartmentId, Name = dbObject.DepartmentName },
                SecurityLevel = securityLevels,
                FullName = $"{dbObject.LastName} {dbObject.FirstName} {dbObject.MiddleName}",
                LastStatusChangedDate = dbObject.LastChangedStatusDate,
                StatusId = dbObject.StatusId,
                StatusName = dbObject.StatusName
            };
        }

        private EmployeeDbObject MapToDbObject(EmployeeView employee)
        {
            return new EmployeeDbObject
            {
                Id = employee.Id,
                AdditionalDocsPath = employee.AdditionalDocsPath,
                BirthdayDate = employee.BirthdayDate,
                DepartmentId = employee.Department.Id,
                FirstName = employee.FirstName,
                IsTemporary = employee.IsTemporary,
                LastChangedStatusDate = employee.LastStatusChangedDate,
                LastName = employee.LastName,
                MiddleName = employee.MiddleName,
                StatusId = employee.StatusId,
                PassDate = employee.PassDate,
                PngPath = employee.PngPath
            };
        }
    }
}
