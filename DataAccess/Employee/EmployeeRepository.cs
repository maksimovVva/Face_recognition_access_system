using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Models.DbModels;
using Infrastructure.DataAccess;

namespace DataAccess.Employee
{
    public class EmployeeRepository : IEmployeeRepository
    {
        public void Create(ISession session, EmployeeDbObject employee)
        {
            var parametrs = new
            {
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                MiddleName = employee.MiddleName,
                BirthdayDate = employee.BirthdayDate,
                PassDate = employee.PassDate,
                IsTemporary = employee.IsTemporary,
                AdditionalDocsPath = employee.AdditionalDocsPath,
                PngPath = employee.PngPath,
                DepartmentId = employee.DepartmentId
            };

            const string query = @"
INSERT INTO dbo.Employee (FirstName, LastName, MiddleName, BirthdayDate, LastStatusChangedDate, PassDate, IsTemporary, DepartmentId, PngPath, AdditionalDocsPath, StatusId)
VALUES(@FirstName, @LastName, @MiddleName, @BirthdayDate, @LastChangedStatusDate, @PassDate, @IsTemporary, @DepartmentId, @PngPath, @AdditionalDocsPath, @StatusId)
";
            session.Execute(query, parametrs);
        }

        public async void Update(ISession session,
            int id,
            string firstName,
            string lastName,
            string middleName,
            DateTime birthday,
            DateTime lastStatusChangedDate,
            DateTime passDate,
            bool isTemporary,
            string additionalDocsPath,
            string pngPath,
            int departmentId)

        {
            var parametrs = new
            {
                FirstName = firstName,
                LastName = lastName,
                MiddleName = middleName,
                BirthdayDate = birthday,
                LastChangedStatusDate = lastStatusChangedDate,
                IsTemporary = isTemporary,
                DepartmentId = departmentId,
                PngPath = pngPath,
                AdditionalDocsPath = additionalDocsPath,
                PassDate = passDate
            };
            const string query = @"
UPDATE dbo.Employee
SET FirstName = @firstName,
    LastName = @lastName,
    MiddleName = @middleName,
    BirthdayDate = @birthday,
    IsTemporary = @isTemporary,
    AdditionalDocsPath = @additionalDocsPath,
    PngPath = @pngPath,
    DepartmentId = @departmentId,
    PassDate = @passDate
WHERE Id = @id
";
            await session.ExecuteAsync(query, parametrs);
        }

        public void DeleteSecurityLevels(ISession session, int employeeId)
        {
            const string query = "DELETE FROM dbo.EmployeeLevelRelation WHERE EmployeeId = @employeeId";
            session.Execute(query, new { employeeId });
        }

        public EmployeeDbObject Get(ISession session, int id)
        {
            const string query = @"
Select 
    e.Id,
    e.FirstName,
    e.LastName,
    e.MiddleName,
    e.BirthdayDate,
    e.LastChangedStatusDate,
    e.PassDate,
    e.IsTemporary,
    e.DepartmentId,
    d.DepartmentName,
    e.PngPath,
    e.AdditionalDocsPath,
    e.StatusId,
    s.StatusName
FROM dbo.Employee e
LEFT JOIN dbo.Department d ON d.Id = e.DepartmentId
LEFT JOIN dbo.Status s ON s.Id = e.StatusId
WHERE e.Id = @id
";
            return session.Query<EmployeeDbObject>(query, new { id }).FirstOrDefault();
        }

        public async Task<IEnumerable<EmployeeDbObject>> Get(ISession session, IEnumerable<int> ids)
        {
            const string query = @"
Select 
    e.Id,
    e.FirstName,
    e.LastName,
    e.MiddleName,
    e.BirthdayDate,
    e.LastChangedStatusDate,
    e.PassDate,
    e.IsTemporary,
    e.DepartmentId,
    d.DepartmentName,
    e.PngPath,
    e.AdditionalDocsPath,
    e.StatusId,
    s.StatusName
FROM dbo.Employee e
LEFT JOIN dbo.Department d ON d.Id = e.DepartmentId
LEFT JOIN dbo.Status s ON s.Id = e.StatusId
WHERE e.Id IN @ids
";
            return await session.QueryAsync<EmployeeDbObject>(query, new { ids });
        }

        public void Delete(ISession session, int id)
        {
            const string query = "DELETE FROM dbo.Employee WHERE Id = @id";

            session.Execute(query, new { id });
        }

        public Domain.Models.Employee.Employee GetEmployee(int id)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<EmployeeDbObject> Load(ISession session, int skip, int take)
        {
            throw new NotImplementedException();
        }
    }
}
