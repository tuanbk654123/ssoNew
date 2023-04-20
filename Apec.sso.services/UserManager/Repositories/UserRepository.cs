using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DataAccess.Models;
using DataAccess.MongoDbHelper;

using UserManager.Repositories.Interfaces;
using MongoDB.Driver;
using DataAccess.Pagination.Base;
using DataAccess.Models.Dto;

namespace UserManager.Repositories
{
    internal sealed class UserRepository : MongoDbBase<Users>, IUserRepository
    {
        public UserRepository(IConfiguration configuration, IMongoDatabase mongoDatabase) : base(configuration, mongoDatabase)
        {
        }

        public async Task<IPage<Users>> Search(IPageable pageable, SearchUserDto searchUserDto)
        {
            var builder = Builders<Users>.Filter;
            var filter = builder.Empty;

            if (!string.IsNullOrEmpty( searchUserDto.UserName))
            {
                filter &= builder.Where(x => x.UserName.Contains(searchUserDto.UserName) );
            }
            if (!string.IsNullOrEmpty(searchUserDto.Email))
            {
                filter &= builder.Where(x => x.Email.Contains(searchUserDto.Email));
            }
            if (!string.IsNullOrEmpty(searchUserDto.PhoneNumber))
            {
                filter &= builder.Where(x => x.PhoneNumber.Contains(searchUserDto.PhoneNumber));
            }
            //if (searchUserDto.IsActive!= null)
            //{
            //    filter &= builder.Where(x => x.IsActive.Equals(searchUserDto.IsActive));
            //}
            var result = await Collection.Find(filter).SortByDescending(e=>e.CreatedOn).Skip((pageable.PageNumber -1)* pageable.PageSize).Limit(pageable.PageSize).ToListAsync();
            var resultCount = await Collection.Find(filter).CountDocumentsAsync();
            var page = new Page<Users>
            {
                PageIndex = pageable == null ? 0 : pageable.PageNumber,
                TotalItem = resultCount,
                Content = result
            };
            return page;
        }
    }
}