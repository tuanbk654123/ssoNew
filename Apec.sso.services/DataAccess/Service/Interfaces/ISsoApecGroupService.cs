﻿
using DataAccess.Models;
using DataAccess.Models.Dto;
using Microsoft.AspNetCore.Identity;
using SsoGroup.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Services.Interfaces
{
    public interface ISsoGroupService
    {
        Task<bool> CreateUsers(CreateUserDto user);
        Task<Users> FindUserById(string id);
        Task<User> FindByNameAsync(string userName);
        Task<Roles> FindRoleByName(string name);
        Task<Roles> FindRoleById(string id);
        Task<bool> RemoveFromRole(RemoveFromRoleDto removeFromRoleDto);
        Task<bool> AddToRole(AddToRoleDto removeFromRoleDto);
        Task<bool> DeleleUser(Users users);
        Task<bool> UpdateUser(Users users);

        Task<bool> CreateRoles(Roles roles);
        Task<bool> UpdateRoles(Roles roles);
        Task<bool> DeleteRoles(Roles roles);

    }
}
