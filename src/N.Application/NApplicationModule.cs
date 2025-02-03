using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using N.Authorization;

namespace N
{
    [DependsOn(
        typeof(NCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class NApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<NAuthorizationProvider>();
            Configuration.Modules.AbpAutoMapper().Configurators.Add(CustomDtoMapper.CreateMappings); 
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(NApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
