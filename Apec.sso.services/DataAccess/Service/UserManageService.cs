
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

using System.Threading.Tasks;

using DataAccess.Services.Interfaces;
using DataAccess.Models.Dto;
using DataAccess.Models;
using SsoGroup.Models;
using Microsoft.AspNetCore.Identity;

namespace DataAccess.Services
{
    public class UserManageService : Base, IUserManageService
    {
        public UserManageService(IConfiguration configuration) : base(configuration)
        {
            BaseUrl = Configuration.GetValue<string>("IUserManagerService:BaseUrl");
            if (BaseUrl?.EndsWith('/') == false) BaseUrl += '/';
        }

        public override Exception CreateException(string message)
        {
            throw new NotImplementedException();
        }
        //Operations/create
        public async Task<bool> Create(CreateUserLoginDto createUserLoginDto)
        {
            var (result, data) = await SendRequest<bool>("/api/usersLogin/Create", createUserLoginDto, RestSharp.Method.Post,
                new Dictionary<string, string> { { "Authorization", GenerateToken() } });
            if (result == System.Net.HttpStatusCode.OK)
                return true;
            else return false;
        }

       
    }
}
