using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Pagination.Base;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserManager.Services.Interfaces;

namespace UserManager.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/ApiScopes")]
    public class ApiScopesController : ControllerBase
    {
        private readonly IApiScopesService ApiScopeservice;
        public ApiScopesController(IApiScopesService ApiScopeservice)
        {
            this.ApiScopeservice = ApiScopeservice;
        }

        [HttpGet]
        public async Task<IActionResult> GetApiScopes(CancellationToken cancellationToken)
        {
            var ApiScopes = await ApiScopeservice.GetAllAsync(cancellationToken);
            return Ok(ApiScopes);
        }


        [HttpPost("CreateListApiScopes")]
        public async Task<IActionResult> Create(List<CreateApiScopesDto> createApiScopesDtos, CancellationToken cancellationToken)
        {
            // Check trùng  Name
            foreach (var apiScopes in createApiScopesDtos)
            {
                // kiểm tra ApiScopes name có trùng chưa
                List<ApiScopes> ApiScopesCreateCheck = await ApiScopeservice.GetByName(apiScopes.Name);
                if (ApiScopesCreateCheck != null && ApiScopesCreateCheck.Count > 0) return BadRequest("Tên ApiScopes đã tồn tại");
            }
            // Tạo ApiScopes
            foreach (var ApiScopes in createApiScopesDtos)
            {

                bool result = await ApiScopeservice.Create(ApiScopes);

                if (result)
                    return Ok("Tạo ApiScopes thành công");
                else
                    return BadRequest("Tạo ApiScopes thất bại");
            }
            return Ok();
        }


        [HttpPost("UpdateApiScopes")]
        public async Task<IActionResult> Update(UpdateApiScopesDto updateApiScopesDto, CancellationToken cancellationToken)
        {

            ApiScopes ApiScopesCreateCheck = await ApiScopeservice.GetById(updateApiScopesDto.Id);
            //ApiScopesCreateCheck.Description = updateApiScopesDto.Description;
            //ApiScopesCreateCheck.ApiScopesName = updateApiScopesDto.ApiScopesName;
            ApiScopesCreateCheck = updateApiScopesDto.Adapt<ApiScopes>();
            // Sửa ApiScopes

            bool result = await ApiScopeservice.Update(ApiScopesCreateCheck);

            if (result)
                return Ok("Sửa ApiScopes thành công");
            else
                return BadRequest("Sửa ApiScopes thất bại");
        }



        [HttpPost("DeleteApiScopes")]
        public async Task<IActionResult> Delete(List<string> ListId, CancellationToken cancellationToken)
        {
            //foreach (var item in ListId)
            //{
            //    // Kiểm tra người dùng có tồn tại hay không
            //    var ApiScopesDelete = await ssoGroupService.FindApiScopesById(item);
            //    if (ApiScopesDelete == null) return BadRequest("Quyền id: " + item + " không tồn tại");
            //}
            // Xoá ApiScopes
            foreach (var item in ListId)
            {
                await ApiScopeservice.Delete(item);
            }

            return Ok("Xoá thành công");
        }


        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchApiScopesDto searchApiScopesDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok(await ApiScopeservice.Search(pageable, searchApiScopesDto));

        }
    }
}
