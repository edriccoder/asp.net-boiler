using System.Threading.Tasks;
using N.Configuration.Dto;

namespace N.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
