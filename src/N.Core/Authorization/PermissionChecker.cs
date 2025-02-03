using Abp.Authorization;
using N.Authorization.Roles;
using N.Authorization.Users;

namespace N.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
