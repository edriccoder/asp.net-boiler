using System.Threading.Tasks;
using Abp.Application.Services;
using N.Sessions.Dto;

namespace N.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
