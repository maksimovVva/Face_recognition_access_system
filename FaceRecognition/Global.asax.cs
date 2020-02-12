using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using Castle.Facilities.TypedFactory;
using Castle.Windsor;
using Castle.Windsor.Installer;
using Domain;

namespace FaceRecognition
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        private readonly IWindsorContainer _container;

        public WebApiApplication()
        {
            _container = new WindsorContainer();
            _container.AddFacility<TypedFactoryFacility>();
            _container.Install(FromAssembly.This());
        }

        protected void Application_Start()
        {
            IoC.Init(_container);
            
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
