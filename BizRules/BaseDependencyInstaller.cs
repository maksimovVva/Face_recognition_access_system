using Castle.Facilities.TypedFactory;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.Resolvers.SpecializedResolvers;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using Infrastructure.DataAccess;

namespace BizRules
{
    public class BaseDependencyInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Kernel.Resolver.AddSubResolver(new CollectionResolver(container.Kernel));

            container.AddFacility<TypedFactoryFacility>();

            container.Register(Component.For<ISessionFactory>().ImplementedBy<SessionFactory>().LifestyleSingleton());

            //container.Install(FromAssembly.Named("MlgBuzz.DataAccess"));
            CustomInstall(container);
        }

        public IWindsorContainer Build()
        {
            var result = new WindsorContainer();
            Install(result, null);
            return result;
        }

        protected virtual void CustomInstall(IWindsorContainer container)
        {
        }
    }
}
