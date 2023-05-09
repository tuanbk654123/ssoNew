using DataAccess.Models;
using DataAccess.Models.Dto;
using IdentityServer4;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SsoGroup.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SsoGroup.Controllers
{
    public class OperationsController : Controller
    {
        private UserManager<Users> userManager;
        private RoleManager<Roles> roleManager;
        private IPasswordHasher<Users> passwordHasher;
        private SignInManager<Users> signInManager;
        private IdentityServerTools tools;

        public OperationsController(UserManager<Users> userManager, RoleManager<Roles> roleManager, IPasswordHasher<Users> passwordHasher, SignInManager<Users> signInManager, IdentityServerTools tools)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.passwordHasher = passwordHasher;
            this.signInManager = signInManager;
            this.tools = tools;
        }

        public ViewResult Create() => View();

        [HttpPost]
        public async Task<IActionResult> Create(User user)
        {
            if (ModelState.IsValid)
            {
                Users appUser = new Users
                {
                    UserName = user.Name,
                    Email = user.Email
                };

                IdentityResult result = await userManager.CreateAsync(appUser, user.Password);

                //Adding Role to user 
                //await userManager.AddToRoleAsync(appUser, "Admin");

                if (result.Succeeded)
                    ViewBag.Message = "User Created Successfully";
                else
                {
                    foreach (IdentityError error in result.Errors)
                        ModelState.AddModelError("", error.Description);
                }
            }
            return View(user);
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDto createUserDto)
        {

            Users appUser = new Users
            {
                UserName = createUserDto.UserName,
                Email = createUserDto.Email,
                PhoneNumber = createUserDto.PhoneNumber,
                IsActive = createUserDto.IsActive,

            };

            IdentityResult result = await userManager.CreateAsync(appUser, createUserDto.Password);

            //Adding Role to user
            if (createUserDto?.Roles != null)
            {
                foreach (var item in createUserDto.Roles)
                {
                    Roles roles = await roleManager.FindByIdAsync(item);
                    await userManager.AddToRoleAsync(appUser, roles?.Name);
                }
            }

            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest();
        }

        // tìm kiếm ng dùng theo user name
        [HttpGet]
        public async Task<Users> FindByName([FromQuery] string userName)
        {
            if (!string.IsNullOrEmpty(userName))
            {
                Users userCreateCheck = await userManager.FindByNameAsync(userName);
                return userCreateCheck;
            }
            return null;
        }

        // tìm kiếm ng dùng theo ID
        [HttpGet]
        public async Task<Users> FindUserById([FromQuery] string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                Users userCreateCheck = await userManager.FindByIdAsync(id);
                return userCreateCheck;
            }
            return null;
        }


        public IActionResult CreateRole() => View();

        // Tạo role 
        [HttpPost]
        public async Task<IActionResult> CreateRole([Required] string name)
        {
            if (ModelState.IsValid)
            {
                IdentityResult result = await roleManager.CreateAsync(new Roles() { Name = name });
                if (result.Succeeded)
                    ViewBag.Message = "Role Created Successfully";
                else
                {
                    foreach (IdentityError error in result.Errors)
                        ModelState.AddModelError("", error.Description);
                }
            }
            return View();
        }

        // Tìm role theo name
        [HttpGet]
        public async Task<Roles> FindRoleByName([Required] string name)
        {
            if (!string.IsNullOrEmpty(name))
            {
                Roles roleCheck = await roleManager.FindByNameAsync(name);
                return roleCheck;
            }
            return null;
        }
        // Tìm role theo id
        [HttpGet]
        public async Task<Roles> FindRoleById([Required] string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                Roles roleCheck = await roleManager.FindByIdAsync(id);
                return roleCheck;
            }
            return null;
        }


        //RemoveFromRole
        [HttpPost]
        public async Task<bool> RemoveFromRole([FromBody] RemoveFromRoleDto removeFromRoleDto)
        {
            if (!string.IsNullOrEmpty(removeFromRoleDto.RoleNameRemove) && removeFromRoleDto.Users != null)
            {
                IdentityResult result = await userManager.RemoveFromRoleAsync(removeFromRoleDto.Users, removeFromRoleDto.RoleNameRemove);
                if (result.Succeeded)
                    return true;
                return false;
            }
            return false;
        }


        //AddToRole
        [HttpPost]
        public async Task<bool> AddToRole([FromBody] AddToRoleDto addToRoleDto)
        {
            if (!string.IsNullOrEmpty(addToRoleDto.RoleIdAdd) && addToRoleDto.Users != null)
            {
                IdentityResult result = await userManager.AddToRoleAsync(addToRoleDto.Users, addToRoleDto.RoleIdAdd);
                if (result.Succeeded)
                    return true;
                return false;
            }
            return false;
        }

        //UpdateFromRole
        [HttpPost]
        public async Task<bool> UpdateFromRole([FromBody] UpdateFromRoleDto updateFromRoleDto)
        {
            if (updateFromRoleDto.RoleIdUpdate != null && updateFromRoleDto.Users != null && updateFromRoleDto.RoleIdDelete != null)
            {
                foreach (var id in updateFromRoleDto.RoleIdDelete)
                {
                    Roles roleCheck = await roleManager.FindByIdAsync(id);
                    IdentityResult result = await userManager.RemoveFromRoleAsync(updateFromRoleDto.Users, roleCheck?.Name);
                    if (!result.Succeeded)
                        return false;
                }

                foreach (var id in updateFromRoleDto.RoleIdUpdate)
                {
                    Roles roleCheck = await roleManager.FindByIdAsync(id);
                    IdentityResult result = await userManager.AddToRoleAsync(updateFromRoleDto.Users, roleCheck?.Name);
                    if (!result.Succeeded)
                        return false;
                }
            }
            return true;
        }

        // update user 
        [HttpPost]
        public async Task<bool> UpdateUser([FromBody] Users user)
        {
            IdentityResult result = await userManager.UpdateAsync(user);
            if (result.Succeeded)
                return true;
            return false;
        }

        // delete  user 
        [HttpPost]
        public async Task<bool> DeleleUser([FromBody] Users users)
        {
            IdentityResult result = await userManager.DeleteAsync(users);
            if (result.Succeeded)
                return true;
            return false;
        }

        //Tạo Role 
        [HttpPost]
        public async Task<bool> CreateRoles([FromBody] Roles roles)
        {
            IdentityResult result = await roleManager.CreateAsync(new Roles() { Name = roles.Name });
            if (result.Succeeded)
                return true;
            return false;
        }


        //sửa Role 
        [HttpPost]
        public async Task<bool> UpdateRoles([FromBody] Roles roles)
        {
            IdentityResult result = await roleManager.UpdateAsync(roles);
            if (result.Succeeded)
                return true;
            return false;
        }


        //Xoá Role 
        [HttpPost]
        public async Task<bool> DeleteRoles([FromBody] Roles roles)
        {
            IdentityResult result = await roleManager.DeleteAsync(roles);
            if (result.Succeeded)
                return true;
            return false;
        }

        // Login

        [HttpPost]
        public async Task<ActionResult> Login([FromBody] User user)
        {
            Users appUser = await userManager.FindByNameAsync(user.Name);
            if (appUser != null)
            {
                //await signInManager.SignOutAsync();
                Microsoft.AspNetCore.Identity.SignInResult result = await signInManager.PasswordSignInAsync(appUser, user.Password, false, false);
                var claims = new List<Claim>();
                claims.Add(new Claim("UserName", user.Name));
                claims.Add(new Claim("Email", appUser.Email));
                if (result.Succeeded)
                {
                    var token = await tools.IssueClientJwtAsync(
                       clientId: "travele",
                       lifetime: 86400,
                       scopes: new[] {"openid",
                        "profile",
                        "ApiTravele" },
                       audiences: new[] { "ApiTravele" }, claims

                       );
                    // token = token.Remove('/');
                    return Ok(token);
                }
            }

            return Unauthorized();
        }
        // Login

        [HttpGet]
        public async void Logout()
        {

            await HttpContext.SignOutAsync();
        }
    }
}
