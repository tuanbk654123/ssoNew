using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Services.Interfaces;
using IdentityModel;
using IdentityServer4;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SsoGroup.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net.Mail;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Linq;
using System.Xml.Linq;

namespace SsoGroup.Controllers
{
    public class AccountController : Controller
    {
        private UserManager<Users> _userManager;
        private SignInManager<Users> _signInManager;
        private readonly IUserManageService _userManageService;
        private IdentityServerTools _tools;
        private IConfiguration _configuration;
        public AccountController(UserManager<Users> userManager, SignInManager<Users> signInManager, IUserManageService userManageService, IdentityServerTools tools, IConfiguration configuration)
        {
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._userManageService = userManageService;
            this._tools = tools;
            _configuration = configuration;
        }

        [AllowAnonymous]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login([Required] string username, [Required] string password, string returnurl)
        {
            if (ModelState.IsValid)
            {
                Users appUser = await _userManager.FindByNameAsync(username);
                if (appUser != null)
                {
                    await _signInManager.SignOutAsync();
                    Microsoft.AspNetCore.Identity.SignInResult result = await _signInManager.PasswordSignInAsync(appUser, password, false, false);
                    if (result.Succeeded)
                    {
                        //Get IP Login
                        string temp = HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress?.ToString();
                        string[] ips = temp?.Split(":");
                        string ip = "";
                        if (ips?.Length >= 4)
                        {
                            ip = ips[3];
                        }

                        // save to Login history 
                        CreateUserLoginDto createUserLoginDto = new CreateUserLoginDto();
                        createUserLoginDto.LoginTime = System.DateTime.UtcNow;
                        createUserLoginDto.UserName = username;
                        createUserLoginDto.Ip = ip;
                        await _userManageService.Create(createUserLoginDto);
                        return Redirect(returnurl ?? "/");
                    }
                }
                ModelState.AddModelError(nameof(username), "Login Failed: Invalid UserName or Password");
            }

            return View();
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> LoginExtened(string username, string password, TypeLoginExtented clientId = TypeLoginExtented.Travel)
        {
            Users appUser = await _userManager.FindByNameAsync(username);
            if (appUser != null)
            {
                //await signInManager.SignOutAsync();
                Microsoft.AspNetCore.Identity.SignInResult result = await _signInManager.PasswordSignInAsync(appUser, password, false, false);
                var claims = new List<Claim>();
                claims.Add(new Claim("UserName", username));
                claims.Add(new Claim("Email", appUser.Email));
                if (result.Succeeded)
                {
                    switch (clientId)
                    {
                        case TypeLoginExtented.Travel:
                            var token = await _tools.IssueClientJwtAsync(
                                              clientId: "travele",
                                              lifetime: 86400,
                                              scopes: new[] {"openid",
                                                "profile",
                                                "ApiTravele" },
                                              audiences: new[] { "ApiTravele" }, claims
                                              );
                            return Ok(token);
                        default:
                            break;
                    }
                    return Ok(string.Empty);
                }
            }
            return Unauthorized();
        }



        public IActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordModel model)
        {
            // Gen token và gửi mail

            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                ViewBag.Message = String.Format("invalid user");
                return View();
            }

            //username test = tuannm
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            // Gửi email link trạng reset

            // Tạo đường link reset
            string BaseUrl = _configuration.GetValue<string>("ISsoGroupService:BaseUrl");
            var url = $"{BaseUrl}/Account/ResetPassword?{nameof(ResetPasswordModel.UserId)}={user.Id}&{nameof(ResetPasswordModel.Token)}={HttpUtility.UrlEncode(token)}";
            // gửi email
            string passEmailConfig = _configuration.GetValue<string>("EmailConfig:Password");
            string emailConfig = _configuration.GetValue<string>("EmailConfig:BaseEmail");
            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential(emailConfig, passEmailConfig),
                EnableSsl = true
            };

            client.Send(emailConfig, user.Email, "Đổi Mật Khẩu", "Nhấn vào đường dẫn sau để đổi mật khẩu: " + url);

            ViewBag.Message = String.Format("sent email success");
            return View();
            //return RedirectToAction("Login");
        }

        public IActionResult ResetPassword(Guid userId, string token)
        {
            return View(new ResetPasswordModel
            {
                UserId = userId,
                Token = token
            });
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(ResetPasswordModel model)
        {
            var existUser = _userManager.Users.FirstOrDefault(x => x.Id == model.UserId);
            if (existUser == null)
            {
                ViewBag.Message = String.Format("invalid user");
                return RedirectToAction("Login");
            }
            var purpose = UserManager<Users>.ResetPasswordTokenPurpose;
            var rsValidate = await _userManager.VerifyUserTokenAsync(existUser, this._userManager.Options.Tokens.PasswordResetTokenProvider, purpose, model.Token);
            if (rsValidate)
            {
                await _userManager.RemovePasswordAsync(existUser);

                await _userManager.AddPasswordAsync(existUser, model.Password);
                ViewBag.Message = String.Format("Success");
                return View();
            }
            else
            {
                ViewBag.Message = String.Format("False");
                return View();
            }

        }

    }
}
