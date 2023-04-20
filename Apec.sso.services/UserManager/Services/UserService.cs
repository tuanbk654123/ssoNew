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


    internal sealed class UserService : IUserService
    {
        private readonly IUserRepository userRepository;


        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;

        }

        public async Task<Users> CreateAsync(Users users, CancellationToken cancellationToken = default)
        {
            var user = await userRepository.UpdateAsync(x => x.Id, users, true);
            return null;
        }

        public async Task<List<Users>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var users = await userRepository.GetAllAsync();
            return users;
        }

        public async Task<IPage<Users>> Search(IPageable pageable, SearchUserDto searchUserDto)
        {
            return await userRepository.Search(pageable, searchUserDto);
        }
    }
}