using System.Threading.Tasks;
using N.Models.TokenAuth;
using N.Web.Controllers;
using Shouldly;
using Xunit;

namespace N.Web.Tests.Controllers
{
    public class HomeController_Tests: NWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}