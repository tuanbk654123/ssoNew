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
    internal sealed class UserLoginRepository : MongoDbBase<UserLogin>, IUserLoginRepository
    {
        public UserLoginRepository(IConfiguration configuration, IMongoDatabase mongoDatabase) : base(configuration, mongoDatabase)
        {
        }

        public async Task<IPage<UserLogin>> Search(IPageable pageable, SearchUserLoginDto searchUserDto)
        {
            var builder = Builders<UserLogin>.Filter;
            var filter = builder.Empty;

            if (!string.IsNullOrEmpty(searchUserDto.UserName))
            {
                filter &= builder.Where(x => x.UserName.Contains(searchUserDto.UserName));
            }
            if (!string.IsNullOrEmpty(searchUserDto.Ip))
            {
                filter &= builder.Where(x => x.Ip.Contains(searchUserDto.Ip));
            }

            // setting date search
         
            if (searchUserDto.fromDate != null)
            {
                DateTime fromDate = new DateTime(searchUserDto.fromDate.Value.Year, searchUserDto.fromDate.Value.Month, searchUserDto.fromDate.Value.Day, 0, 0, 0);
                filter &= Builders<UserLogin>.Filter.Gte(x => x.LoginTime, fromDate);
            }
            if (searchUserDto.toDate != null)
            {
                DateTime toDate = new DateTime(searchUserDto.toDate.Value.Year, searchUserDto.toDate.Value.Month, searchUserDto.toDate.Value.Day, 23, 59, 59);
                filter &= Builders<UserLogin>.Filter.Lt(x => x.LoginTime, toDate);
            }

            var result = await Collection.Find(filter).SortByDescending(e => e.LoginTime).Skip((pageable.PageNumber - 1) * pageable.PageSize).Limit(pageable.PageSize).ToListAsync();
            var resultCount = await Collection.Find(filter).CountDocumentsAsync();
            var page = new Page<UserLogin>
            {
                PageIndex = pageable == null ? 0 : pageable.PageNumber,
                TotalItem = resultCount,
                Content = result
            };
            return page;
        }

    }
}