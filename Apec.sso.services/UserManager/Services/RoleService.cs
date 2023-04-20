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


    internal sealed class RoleService : IRoleService
    {
        private readonly IRoleRepository roleRepository;


        public RoleService(IRoleRepository roleRepository)
        {
            this.roleRepository = roleRepository;

        }

        public async Task<List<Roles>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var roles = await roleRepository.GetAllAsync();
            return roles;
        }

        public async Task<IPage<Roles>> Search(IPageable pageable, SearchRoleDto searchRoleDto)
        {
            return await roleRepository.Search(pageable, searchRoleDto);
        }
    }
}