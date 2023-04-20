
using DataAccess.Models.Dto.Api;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace DataAccess.MongoDbHelper.Interface
{
    public interface IMongoDbBase<T>
    {
        Task<List<T>> GetAllAsync(OptionalParam<PageParametersDto> paging = null, FilterDefinition<T> filterLocation = null, CancellationToken cancellationToken = default);
        Task<T> GetByIndexAsync(Expression<Func<T, object>> index, object value, CancellationToken cancellationToken = default);
        Task<List<T>> GetListByIndexAsync(Expression<Func<T, object>> index, object value, CancellationToken cancellationToken = default);
        Task RemoveAsync(T obj);
        Task<List<T>> FindNear(Expression<Func<T, object>> field, double longitude, double latitude, double maxDistanceInKm);

        /// <summary>
        /// Create or update an object into a DB
        /// </summary>
        /// <param name="index"> Field name that is used to query, normally is Id, IMEI...</param>
        /// <param name="obj">Data need to insert or update, only none null property is updated/inserted into DB </param>
        /// <param name="isCreate">Update: False, Insert: True </param>
        /// <returns></returns>
        Task<bool> UpdateAsync(Expression<Func<T, object>> index, T obj, bool isCreate, CancellationToken cancellationToken = default);
        Task<bool> CreateListAsync(Expression<Func<T, object>> index, IEnumerable<T> entities, bool isCreate, CancellationToken cancellationToken = default);
    }
}
