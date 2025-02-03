using System.Threading.Tasks;
using Abp.Application.Services;
using N.Authorization.Accounts.Dto;

namespace N.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
