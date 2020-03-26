using Castle.Windsor;

namespace Domain
{
    public class IoC
    {
        private static IWindsorContainer _innerContainer;

        public static void Init(IWindsorContainer container)
        {
            _innerContainer = container;
        }

        public static TService Resolve<TService>() where TService : class
        {
            return _innerContainer.Resolve<TService>();
        }
    }
}
