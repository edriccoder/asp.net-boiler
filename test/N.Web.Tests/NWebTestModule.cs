using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using N.EntityFrameworkCore;
using N.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace N.Web.Tests
{
    [DependsOn(
        typeof(NWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class NWebTestModule : AbpModule
    {
        public NWebTestModule(NEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(NWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(NWebMvcModule).Assembly);
        }
    }
}