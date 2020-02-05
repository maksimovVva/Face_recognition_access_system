using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models.Employee;
using Domain.Models.Requests;

namespace BizRules.Employee
{
    public interface IEmployeeBizRules
    {
        void Create(EmployeeRequest request);

        void UpdateAsync(int id, EmployeeRequest request);

        void UpdateAsync(IEnumerable<EmployeeView> employees);

        void Delete(int id);

        Task<EmployeeView> GetAsync(int id);

        Task<IEnumerable<EmployeeView>> GetAsync(IEnumerable<int> ids);

        IEnumerable<EmployeeView> GetAsync(LoadEmployeeRequest request);

        Task<IEnumerable<EmployeeView>> Load(EmployeeLoadRequest request);
    }
}
