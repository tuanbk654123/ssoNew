
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Newtonsoft.Json;

using DataAccess.Models;
using Microsoft.AspNetCore.Identity;

namespace SsoGroup
{
    public class ProfileService : IProfileService
    {
        private readonly ILogger _logger;
        private UserManager<Users> userManager;
        public ProfileService(ILogger<ProfileService> logger, UserManager<Users> userManager)
        {
            _logger = logger;
            this.userManager = userManager;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var subject = context.Subject.FindFirstValue("sub");
            if (subject == null)
            {
                _logger.LogError("Subject claim is null");
                //Task.CompletedTask;
            }
            //if (!string.TryParse(subject, out string userId))
            //{
            //    _logger.LogError("Cannot parse userId from subject claim");
            //    return Task.CompletedTask;
            //}

            //var user = userManager.FindByIdAsync(subject);
            Users user = userManager.FindByIdAsync(subject).Result;

            var claims = new List<Claim>();


            if (user.UserName  != null)
            {
                claims.Add(new Claim( "UserName", user.UserName));
            }
            context.IssuedClaims.AddRange(claims);
         
            //return Task.CompletedTask;
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            context.IsActive = true;
            return Task.CompletedTask;
        }
    }
}
