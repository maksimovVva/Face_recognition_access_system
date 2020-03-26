using System.Web.Http;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using FaceRecognition.Controllers;

namespace FaceRecognition.Installers
{
    public class ControllersInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                Classes
                    .FromAssemblyContaining<EmployeesController>()
                    .BasedOn<ApiController>()
                    .LifestyleTransient());
        }
    }
}