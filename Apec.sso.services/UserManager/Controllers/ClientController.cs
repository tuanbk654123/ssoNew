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
    [Route("api/Clients")]
    public class ClientController : ControllerBase
    {
        private readonly IClientService ClientService;
        public ClientController(IClientService ClientService)
        {
            this.ClientService = ClientService;
        }

        [HttpGet]
        public async Task<IActionResult> GetClient(CancellationToken cancellationToken)
        {
            var Clients = await ClientService.GetAllAsync(cancellationToken);
            return Ok(Clients);
        }
        [HttpPost("CreateListClient")]
        public async Task<IActionResult> Create(List<CreateClientDto> createClientDtos, CancellationToken cancellationToken)
        {
            // Check trùng  Name
            foreach (var Client in createClientDtos)
            {
                // kiểm tra Client name có trùng chưa
                List<Clients> ClientCreateCheck = await ClientService.GetByName(Client.ClientName);
                if (ClientCreateCheck != null && ClientCreateCheck.Count > 0) return BadRequest("Tên client đã tồn tại");
            }
            // Tạo Client
            foreach (var Client in createClientDtos)
            {

                bool result = await ClientService.Create(Client);

                if (result)
                    return Ok("Tạo client thành công");
                else
                    return BadRequest("Tạo client thất bại");
            }
            return Ok();
        }


        [HttpPost("UpdateClient")]
        public async Task<IActionResult> Update(UpdateClientDto updateClientDto, CancellationToken cancellationToken)
        {

            Clients ClientCreateCheck = await ClientService.GetById(updateClientDto.Id);
            //ClientCreateCheck.Description = updateClientDto.Description;
            //ClientCreateCheck.ClientName = updateClientDto.ClientName;
            ClientCreateCheck = updateClientDto.Adapt<Clients>();
            // Sửa Client

            bool result = await ClientService.Update(ClientCreateCheck);

            if (result)
                return Ok("Sửa client thành công");
            else
                return BadRequest("Sửa client thất bại");
        }



        [HttpPost("DeleteClient")]
        public async Task<IActionResult> Delete(List<string> ListId, CancellationToken cancellationToken)
        {
            //foreach (var item in ListId)
            //{
            //    // Kiểm tra người dùng có tồn tại hay không
            //    var ClientDelete = await ssoGroupService.FindClientById(item);
            //    if (ClientDelete == null) return BadRequest("Quyền id: " + item + " không tồn tại");
            //}
            // Xoá client
            foreach (var item in ListId)
            {
                await ClientService.Delete(item);
            }

            return Ok("Xoá thành công");
        }

        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchClientDto searchClientDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok(await ClientService.Search(pageable, searchClientDto));

        }
    }
}
