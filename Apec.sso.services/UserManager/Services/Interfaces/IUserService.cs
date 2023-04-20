using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Pagination.Base;

namespace UserManager.Services.Interfaces
{
    public interface IUserService
    {

        Task<List<Users>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IPage<Users>> Search(IPageable pageable, SearchUserDto searchUserDto);
        Task<Users> CreateAsync(Users users, CancellationToken cancellationToken = default);
        
        //    FindByNameAsync

    }
}