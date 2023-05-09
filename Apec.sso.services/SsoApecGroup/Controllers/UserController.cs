using DataAccess.Models;
using IdentityServer4;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SsoGroup.Models;
using System.Threading.Tasks;

namespace UserManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        private SignInManager<Users> signInManager;
        private readonly ILogger<UserController> _logger;
        private UserManager<Users> userManager;
        IdentityServerTools tools;
        public UserController(ILogger<UserController> logger, UserManager<Users> userManager, SignInManager<Users> signInManager, IdentityServerTools tools)
        {
            _logger = logger;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tools = tools;
        }

        [HttpPost(Name = "CreateUser")]
        public async Task<ActionResult> CreateUserAsync(User user)
        {
            Users appUser = new Users
            {
                UserName = user.Name,
                Email = user.Email
            };

            IdentityResult result = await userManager.CreateAsync(appUser, user.Password);

            //Adding User to Admin Role
            await userManager.AddToRoleAsync(appUser, "Admin");

            if (result.Succeeded)
                return Ok("User Created Successfully");
            else
            {
                return BadRequest("False to create User");
            }

        }

        [HttpPost(Name = "Login")]
        public async Task<ActionResult> Login(User user)
        {
            Users appUser = await userManager.FindByNameAsync(user.Name);
            if (appUser != null)
            {
                await signInManager.SignOutAsync();
                Microsoft.AspNetCore.Identity.SignInResult result = await signInManager.PasswordSignInAsync(appUser, user.Password, false, false);
                if (result.Succeeded)
                {
                    var token = await tools.IssueClientJwtAsync(
                    clientId: "client_id",
                    lifetime: 3600,
                    audiences: new[] { "backend.api" });
                    return Ok(token);
                }
            }
            return Unauthorized();
        }
        //[HttpPost(Name = "Search")]
        //public async Task<ActionResult> Search(SearchUser searchUser)
        //{



        //}
    }
}