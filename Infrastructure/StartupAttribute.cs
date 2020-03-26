using System;

namespace Infrastructure
{
    [AttributeUsage(AttributeTargets.Assembly)]
    public class StartupAttribute : Attribute
    {
    }
}
