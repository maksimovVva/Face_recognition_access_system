using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using DataAccess.Camera;
using DataAccess.Department;
using DataAccess.Employee;
using DataAccess.SecurityLevel;
using Infrastructure.DataAccess;

namespace FaceRecognition.Installers
{
    public class RepoInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                Component.For<IEmployeeRepository>().ImplementedBy<EmployeeRepository>().LifestyleSingleton(),
                Component.For<ISecurityLevelRepository>().ImplementedBy<SecurityLevelRepository>().LifestyleSingleton(),
                Component.For<IEmployeeRepository>().ImplementedBy<EmployeeRepository>().LifestyleSingleton(),
                Component.For<IDepartmentRepository>().ImplementedBy<DepartmentRepository>().LifestyleSingleton(),
                Component.For<ICameraRepository>().ImplementedBy<CameraRepository>().LifestyleSingleton()
            );
            container.Register(Component.For<ISessionFactory>().ImplementedBy<SessionFactory>().LifestyleSingleton());
        }
    }
}