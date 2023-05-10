using DataAccess.Models.Dto;
using DataAccess.Pagination.Base;
using DataAccess.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserManager.Services.Interfaces;

namespace UserManager.Controllers
{
    [Route("api/usersLogin")]
    [Authorize]
    [ApiController]
    public class UserLoginController : ControllerBase
    {
        private readonly IUserLoginService userLoginService;
        private readonly ISsoGroupService ssoGroupService;
        public UserLoginController(IUserLoginService userLoginService, ISsoGroupService ssoGroupService)
        {
            this.userLoginService = userLoginService;
            this.ssoGroupService = ssoGroupService;
        }


        [HttpPost("Create")]
        [AllowAnonymous]
        public async Task<bool> Create(CreateUserLoginDto createUserLoginDto, CancellationToken cancellationToken)
        {
            bool create = await userLoginService.Create(createUserLoginDto, cancellationToken);
            if (create)
            {
                return true;
            }
            return false;
        }


        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchUserLoginDto searchUserLoginDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok(await userLoginService.Search(pageable, searchUserLoginDto));
        }
    }
}
