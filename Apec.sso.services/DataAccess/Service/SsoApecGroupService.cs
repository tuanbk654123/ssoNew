
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
    public class SsoGroupService : Base, ISsoGroupService
    {
        public SsoGroupService(IConfiguration configuration) : base(configuration)
        {
            BaseUrl = Configuration.GetValue<string>("ISsoGroupService:BaseUrl");
            if (BaseUrl?.EndsWith('/') == false) BaseUrl += '/';
        }


        public override Exception CreateException(string message)
        {
            throw new NotImplementedException();
        }
        //Operations/create
        public async Task<bool> CreateUsers(CreateUserDto createUserDto)
        {
            var (result, data) = await SendRequest<bool>("/Operations/CreateUser", createUserDto, RestSharp.Method.Post,
                new Dictionary<string, string> { { "Authorization", GenerateToken() } });
            if (result == System.Net.HttpStatusCode.OK)
                return true;
            else return false;
        }

        
        // tìm người dùng theo username 
        public async Task<User> FindByNameAsync(string userName)
        {
            var (result, data) = await SendRequest<User>("/Operations/FindByName?userName=" + userName,string.Empty, RestSharp.Method.Get,
                new Dictionary<string, string> { { "Authorization", GenerateToken() } });

            if (result == System.Net.HttpStatusCode.OK)
                return data;

            else return null;
        }

        // tìm người dùng theo Id 
        public async Task<Users> FindUserById(string id)
        {
            var (result, data) = await SendRequest<Users>("/Operations/FindUserById?id=" + id, string.Empty, RestSharp.Method.Get,
                new Dictionary<string, string> { { "Authorization", GenerateToken() } });

            if (result == System.Net.HttpStatusCode.OK)
                return data;

            else return null;
        }

        //tìm role theo name 
        public async Task<Roles> FindRoleByName(string name)
        {
            var (result, data) = await SendRequest<Roles>("/Operations/FindRoleByName?name=" + name, string.Empty, RestSharp.Method.Get,
                new Dictionary<string, string> { { "Authorization", GenerateToken() } });

            if (result == System.Net.HttpStatusCode.OK)
                return data;

            else return null;
        }
        //tìm role theo id 
        public async Task<Roles> FindRoleById(string id)
        {
            var (result, data) = await SendRequest<Roles>("/Operations/FindRoleById?id=" + id, string.Empty, RestSharp.Method.Get,
                new Dictionary<string, string> { { "Authorization", GenerateToken() } });

            if (result == System.Net.HttpStatusCode.OK)
                return data;

            else return null;
        }

        //RemoveFromRole
        public async Task<bool> RemoveFromRole(RemoveFromRoleDto removeFromRoleDto)
        {
            var (result, data) = await SendRequest<bool>("/Operations/RemoveFromRole", removeFromRoleDto, RestSharp.Method.Post,
                new Dictionary<string, string> { { "Authorization", GenerateToken() } });

            return data;

        }

        //AddToRole
        public async Task<bool> AddToRole(AddToRoleDto addToRoleDto)
        {
            var (result, data) = await SendRequest<bool>("/Operations/AddToRole", addToRoleDto, RestSharp.Method.Post,
                new Dictionary<string, string> { { "Authorization", GenerateToken() } });

            return data;

        }

        //UpdateUser
        public async Task<bool> UpdateUser(Users users)
        {
            var (result, data) = await SendRequest<bool>("/Operations/UpdateUser", users, RestSharp.Method.Post,
                new Dictionary<string, string> { { "Authorization", GenerateToken() } });
            if (result == System.Net.HttpStatusCode.OK)
                return true;
            else return false;

        }

        //DeleleUser
        public async Task<bool> DeleleUser(Users users)
        {
            var (result, data) = await SendRequest<bool>("/Operations/DeleleUser", users, RestSharp.Method.Post,
                new Dictionary<string, string> { { "Authorization", GenerateToken() } });
            if (result == System.Net.HttpStatusCode.OK)
                return true;
            else return false;

        }

        //Create Role
        public async Task<bool> CreateRoles(Roles roles)
        {
            var (result, data) = await SendRequest<bool>("/Operations/CreateRoles", roles, RestSharp.Method.Post,
                new Dictionary<string, string> { { "Authorization", GenerateToken() } });
            if (result == System.Net.HttpStatusCode.OK)
                return true;
            else return false;

        }
        //Update role
        public async Task<bool> UpdateRoles(Roles roles)
        {
            var (result, data) = await SendRequest<bool>("/Operations/UpdateRoles", roles, RestSharp.Method.Post,
                new Dictionary<string, string> { { "Authorization", GenerateToken() } });
            if (result == System.Net.HttpStatusCode.OK)
                return true;
            else return false;

        }
        //Delele Roles
        public async Task<bool> DeleteRoles(Roles roles)
        {
            var (result, data) = await SendRequest<bool>("/Operations/DeleteRoles", roles, RestSharp.Method.Post,
                new Dictionary<string, string> { { "Authorization", GenerateToken() } });
            if (result == System.Net.HttpStatusCode.OK)
                return true;
            else return false;

        }
    }
}
