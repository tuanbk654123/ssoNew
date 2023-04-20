

using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.MongoDbHelper.Interface;
using DataAccess.Pagination.Base;

namespace UserManager.Repositories.Interfaces
{
    public interface IUserRepository : IMongoDbBase<Users>
    {
        public Task<IPage<Users>> Search(IPageable pageable, SearchUserDto searchUserDto);
    }
}