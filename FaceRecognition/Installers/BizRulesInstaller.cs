using BizRules.Camera;
using BizRules.Department;
using BizRules.Employee;
using BizRules.EmployeeStatus;
using BizRules.SecurityLevel;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;

namespace FaceRecognition.Installers
{
    public class BizRulesInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                Component.For<IEmployeeBizRules>().ImplementedBy<EmployeeBizRules>().LifestyleSingleton(),
                Component.For<ICameraBizRules>().ImplementedBy<CameraBizRules>().LifestyleSingleton(),
                Component.For<IDepartmentBizRules>().ImplementedBy<DepartmentBizRules>().LifestyleSingleton(),
                Component.For<IEmployeeStatus>().ImplementedBy<EmployeeStatus>().LifestyleSingleton(),
                Component.For<ISecurityLevel>().ImplementedBy<SecurityLevelBizRules>().LifestyleSingleton()
            );
        }
    }
}