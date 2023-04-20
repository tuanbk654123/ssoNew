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


    internal sealed class ApiScopesService : IApiScopesService
    {
        private readonly IApiScopesRepository apiScopesRepository;


        public ApiScopesService(IApiScopesRepository apiScopesRepository)
        {
            this.apiScopesRepository = apiScopesRepository;

        }

        public async Task<List<ApiScopes>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var ApiScopess = await apiScopesRepository.GetAllAsync();
            return ApiScopess;
        }

        public async Task<IPage<ApiScopes>> Search(IPageable pageable, SearchApiScopesDto searchApiScopesDto)
        {
            return await apiScopesRepository.Search(pageable, searchApiScopesDto);
        }
    }
}