using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

using UserManager.Repositories.Interfaces;

namespace UserManager.Services
{
    using System;
    using DataAccess.Models;
    using DataAccess.Models.Dto;
    using DataAccess.Pagination.Base;
    using Interfaces;
    using Microsoft.AspNetCore.DataProtection.KeyManagement;
    using Microsoft.AspNetCore.Http;
    using UserManager.Repositories;


    internal sealed class UserLoginService : IUserLoginService
    {
        private readonly IUserLoginRepository userLoginRepository;


        public UserLoginService(IUserLoginRepository userLoginRepository)
        {
            this.userLoginRepository = userLoginRepository;

        }

        public async Task<bool> Create(CreateUserLoginDto createUserLoginDto, CancellationToken cancellationToken = default)
        {

            UserLogin userLogin = new UserLogin();
            userLogin.UserName = createUserLoginDto.UserName;
            userLogin.Ip = createUserLoginDto.Ip;
            userLogin.LoginTime = createUserLoginDto.LoginTime;
            userLogin.Id = Guid.NewGuid().ToString();

            var result = await userLoginRepository.UpdateAsync(x => x.Id, userLogin, true);
            return result;
        }

        public async Task<IPage<UserLogin>> Search(IPageable pageable, SearchUserLoginDto searchUserLoginDto)
        {
            return await userLoginRepository.Search(pageable, searchUserLoginDto);
        }
    }
}