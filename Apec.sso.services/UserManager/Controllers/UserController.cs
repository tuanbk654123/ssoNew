using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Pagination.Base;
using DataAccess.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SsoGroup.Models;
using UserManager.Services.Interfaces;

namespace UserManager.Controllers
{
    [Route("api/users")]
    //[Authorize]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly ISsoGroupService ssoGroupService;
        private IWebHostEnvironment _hostEnvironment;

        public UsersController(IUserService userService, ISsoGroupService ssoGroupService, IWebHostEnvironment hostEnvironment)

        {
            this.userService = userService;
            this.ssoGroupService = ssoGroupService;
            _hostEnvironment = hostEnvironment;
        }


        [HttpGet]
        public async Task<IActionResult> GetUser(CancellationToken cancellationToken)
        {
            var user = await userService.GetAllAsync(cancellationToken);

            return Ok(user);
        }

        [HttpPost("CreateListUser")]
        public async Task<IActionResult> CreateListUser(List<CreateUserDto> createUserDtos, CancellationToken cancellationToken)
        {
            // Check trùng User Name
            foreach (var user in createUserDtos)
            {
                // kiểm tra user name có trùng chưa
                User userCheck = await ssoGroupService.FindByNameAsync(user.UserName);
                if (userCheck != null) return BadRequest("Tên người dùng đã tồn tại");
            }
            // Check Role có tồn tại hay không 
            foreach (var item in createUserDtos)
            {
                // Check Role có tồn tại hay không 
                foreach (var role in item.Roles)
                {
                    Roles roleCheck = await ssoGroupService.FindRoleById(role);
                    if (roleCheck == null) return BadRequest("Quyền không tồn tại");
                }
            }

            // Tạo người dùng
            foreach (var user in createUserDtos)
            {
                // call to sso
                bool result = await ssoGroupService.CreateUsers(user);

                if (result)
                    return Ok("Tạo người dùng thành công");
                else
                    return BadRequest("Tạo người dùng thất bại");
            }
            return Ok();
        }

        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser(UpdateUserDto updateUserDto, CancellationToken cancellationToken)
        {
            // Kiển tra người dùng có tồn tại hay không
            Users userUpdate = await ssoGroupService.FindUserById(updateUserDto.Id);
            if (userUpdate == null) return NotFound("Không tìm thấy người dùng");
            // kiểm tra user name có trùng chưa
            User userUpdateCheck = await ssoGroupService.FindByNameAsync(updateUserDto.UserName);
            if (updateUserDto.UserName != userUpdate.UserName && userUpdateCheck != null)
            {
                return BadRequest("Tên người dùng đã tồn tại");
            }
            // Check Role có tồn tại hay không 

            foreach (var role in updateUserDto.RoleIds)
            {
                Roles roleCheck = await ssoGroupService.FindRoleById(role);
                if (roleCheck == null) return BadRequest("Quyền không tồn tại");
            }

            //Map các trường update
            userUpdate.UserName = updateUserDto.UserName;
            userUpdate.PhoneNumber = updateUserDto.PhoneNumber;
            userUpdate.Email = updateUserDto.Email;


            // Update role 
            // Delete all role
            foreach (var item in userUpdate.Roles)
            {
                Roles role = await ssoGroupService.FindRoleById(item.ToString());
                RemoveFromRoleDto removeFromRoleDto = new RemoveFromRoleDto();
                removeFromRoleDto.Users = userUpdate;
                removeFromRoleDto.RoleNameRemove = role?.Name;
                await ssoGroupService.RemoveFromRole(removeFromRoleDto);
            }
            // Add new role 
            foreach (var item in updateUserDto.RoleIds)
            {
                AddToRoleDto addToRoleDto = new AddToRoleDto();
                addToRoleDto.Users = userUpdate;
                addToRoleDto.RoleIdAdd = item;
                await ssoGroupService.AddToRole(addToRoleDto);
            }

            //update
            bool result = await ssoGroupService.UpdateUser(userUpdate);
            if (result)
                return Ok("Sửa người dùng thành công");
            else
                return BadRequest("Sửa người dùng thất bại");

        }

        [HttpPost("DeleteListUser")]
        public async Task<IActionResult> DeleteListUser(List<string> ListId, CancellationToken cancellationToken)
        {
            foreach (var item in ListId)
            {
                // Kiểm tra người dùng có tồn tại hay không
                var userDelete = await ssoGroupService.FindUserById(item);
                if (userDelete == null) return BadRequest("Người dùng id: " + item + " không tồn tại");
            }
            // Xoá người dùng
            foreach (var item in ListId)
            {
                var userDelete = await ssoGroupService.FindUserById(item);
                await ssoGroupService.DeleleUser(userDelete);
            }

            return Ok("Xoá thành công");
        }

        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchUserDto searchUserDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok(await userService.Search(pageable, searchUserDto));

        }

        [HttpPost("IMPORRT")]
        [AllowAnonymous]
        public async Task<IActionResult> ImportUser(CancellationToken cancellationToken)
        {
            //// Check trùng User Name
            //foreach (var user in createUserDtos)
            //{
            //    // kiểm tra user name có trùng chưa
            //    User userCheck = await ssoGroupService.FindByNameAsync(user.UserName);
            //    if (userCheck != null) return BadRequest("Tên người dùng đã tồn tại");
            //}

            // Đọc json
            var rootPath = _hostEnvironment.ContentRootPath; //get the root path
            var fullPath = rootPath + "/InitUser/USERS.json"; //combine the root path with that of our json file inside mydata directory
            var jsonData = System.IO.File.ReadAllText(fullPath); //read all the content inside the file

            List<CreateUserDto> createUserDtos = new List<CreateUserDto>();

            if (!string.IsNullOrWhiteSpace(jsonData))
            {
                List<UserInitDto> UserInitDto = JsonConvert.DeserializeObject<List<UserInitDto>>(jsonData);
                // Add location
                foreach (var item in UserInitDto)
                {
                    CreateUserDto temp = new CreateUserDto();
                    temp.UserName = item.USERNAME;
                    temp.Email = item.EMAIL;
                    temp.Password = item.PASSWORD;
                    //temp.Password = "@123";
                    temp.Roles = null;
                    temp.PhoneNumber = null;
                    temp.IsActive = true;


                    createUserDtos.Add(temp);

                    //=======================================
                    //Users user = new Users();
                    //user.UserName = item.USERNAME;  
                    //user.Email = item.EMAIL;
                    //user.PasswordHash = passwordHasher.HashPassword(user, "d");
                    //string paswoord = passwordHasher.HashPassword(user, "d");
                    //userService.CreateAsync(user);
                }
            }

            // Tạo người dùng
            foreach (var user in createUserDtos)
            {
                // call to sso
                bool result = await ssoGroupService.CreateUsers(user);

                //if (result)
                //    return Ok("Tạo người dùng thành công");
                //else
                //    return BadRequest("Tạo người dùng thất bại");
            }
            return Ok();
        }
    }
}
