using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Pagination.Base;
using DataAccess.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserManager.Services.Interfaces;

namespace UserManager.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/Roles")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService roleService;
        private readonly ISsoGroupService ssoGroupService;
        public RoleController(IRoleService roleService, ISsoGroupService ssoGroupService)

        {
            //this.userManager = userManager;
            //this.roleManager = roleManager;
            this.roleService = roleService;
            this.ssoGroupService = ssoGroupService;
        }


        [HttpGet]
        public async Task<IActionResult> GetRole(CancellationToken cancellationToken)
        {
            var roles = await roleService.GetAllAsync(cancellationToken);

            return Ok(roles);
        }
        [HttpPost("CreateListRole")]
        public async Task<IActionResult> CreateListRole(List<CreateRoleDto> createRoleDtos, CancellationToken cancellationToken)
        {
            // Check trùng  Name
            foreach (var role in createRoleDtos)
            {
                // kiểm tra role name có trùng chưa
                Roles roleCreateCheck = await ssoGroupService.FindRoleByName(role.Name);
                if (roleCreateCheck != null) return BadRequest("Tên quyền đã tồn tại");
            }
            // Tạo Quyền
            foreach (var role in createRoleDtos)
            {
                Roles appRole = new Roles
                {
                    Name = role.Name
                };

                bool result = await ssoGroupService.CreateRoles(appRole);

                if (result)
                    return Ok("Tạo quyền thành công");
                else
                    return BadRequest("Tạo quyền thất bại");
            }
            return Ok();
        }


        [HttpPost("UpdateRole")]
        public async Task<IActionResult> UpdateRole(UpdateRoleDto updateRoleDto, CancellationToken cancellationToken)
        {
            // Kiển tra role có tồn tại hay không
            Roles roleUpdate = await ssoGroupService.FindRoleById(updateRoleDto.Id);
            if (roleUpdate == null) return NotFound("Không tìm thấy Quyền");
            // kiểm tra user name có trùng chưa
            Roles roleUpdateCheck = await ssoGroupService.FindRoleByName(updateRoleDto.Name);
            if (updateRoleDto.Name != roleUpdate.Name && roleUpdateCheck != null)
            {
                return BadRequest("Tên người dùng đã tồn tại");
            }

            //Map các trường update
            roleUpdate.Name = updateRoleDto.Name;
            roleUpdate.Description = updateRoleDto.Description;


            bool result = await ssoGroupService.UpdateRoles(roleUpdate);
            if (result)
                return Ok("Sửa quyền thành công");
            else
                return BadRequest("Sửa quyền thất bại");

        }



        [HttpPost("DeleteRole")]
        public async Task<IActionResult> DeleteListUser(List<string> ListId, CancellationToken cancellationToken)
        {
            foreach (var item in ListId)
            {
                // Kiểm tra người dùng có tồn tại hay không
                var roleDelete = await ssoGroupService.FindRoleById(item);
                if (roleDelete == null) return BadRequest("Quyền id: " + item + " không tồn tại");
            }
            // Xoá người dùng
            foreach (var item in ListId)
            {
                var roleDelete = await ssoGroupService.FindRoleById(item);
                await ssoGroupService.DeleteRoles(roleDelete);
            }

            return Ok("Xoá thành công");
        }

        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchRoleDto searchRoleDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok(await roleService.Search(pageable, searchRoleDto));

        }
    }
}
