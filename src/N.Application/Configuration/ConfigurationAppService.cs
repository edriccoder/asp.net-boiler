using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using N.Configuration.Dto;

namespace N.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : NAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
