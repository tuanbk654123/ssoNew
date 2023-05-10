using UserManager.Repositories.Interfaces;

namespace UserManager.Services
{
    using DataAccess.ExceptionFilter.Exceptions;
    using DataAccess.Models;
    using DataAccess.Models.Dto;
    using DataAccess.Pagination.Base;
    using Interfaces;
    using Mapster;
    using System;


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
        public async Task<List<ApiScopes>> GetByName(string name, CancellationToken cancellationToken = default)
        {
            var Clients = await apiScopesRepository.GetByName(name);
            return Clients;
        }
        public async Task<bool> Create(CreateApiScopesDto createApiScopesDto, CancellationToken cancellationToken = default)
        {

            ApiScopes? apiScopes = new ApiScopes();
            apiScopes = createApiScopesDto?.Adapt<ApiScopes>();
            apiScopes.Id = Guid.NewGuid().ToString();
            var result = await apiScopesRepository.UpdateAsync(x => x.Id, apiScopes, true);
            return result;
        }


        public async Task<ApiScopes> GetById(string id, CancellationToken cancellationToken = default)
        {
            var ExportPrice = await apiScopesRepository.GetByIndexAsync(x => x.Id, id);

            return ExportPrice;

        }
        public async Task<bool> Update(ApiScopes apiScopes, CancellationToken cancellationToken = default)
        {
            //var Client = updateExportPriceDto.Adapt<Clients>();
            return await apiScopesRepository.UpdateAsync(x => x.Id, apiScopes, false, cancellationToken);
        }

        public async Task<bool> Delete(string id, CancellationToken cancellationToken = default)
        {
            var ExportPrice = await apiScopesRepository.GetByIndexAsync(x => x.Id, id);
            if (ExportPrice != null)
            {
                return await apiScopesRepository.Delete(id);
            }
            throw new NotFoundException("Không tồn tại hóa đơn");
        }
        public async Task<IPage<ApiScopes>> Search(IPageable pageable, SearchApiScopesDto searchApiScopesDto)
        {
            return await apiScopesRepository.Search(pageable, searchApiScopesDto);
        }
    }
}