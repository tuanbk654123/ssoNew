
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
    public interface IUserManageService
    {
        Task<bool> Create(CreateUserLoginDto createUserLoginDto);

    }
}
