
using DataAccess.Models.Dto.Api;
using DataAccess.MongoDbHelper.Interface;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Driver.GeoJsonObjectModel;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace DataAccess.MongoDbHelper
{
    public abstract class MongoDbBase<T> : IMongoDbBase<T>
    {
        protected IMongoDatabase MongoDatabase;
        protected IMongoCollection<T> Collection { get; set; }

        protected MongoDbBase(IConfiguration configuration, IMongoDatabase mongoDatabase)
        {
            MongoDatabase = mongoDatabase;
            Collection = MongoDatabase.GetCollection<T>(typeof(T).Name);

            // Check if a field name Coordinate exist => create index
            foreach (var property in typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance))
            {
                if (property.Name == "Coordinate")
                {
                    try
                    {
                        var indexKeysDefinition = Builders<T>.IndexKeys.Geo2DSphere("Coordinate");
                        Collection.Indexes.CreateOne(new CreateIndexModel<T>(indexKeysDefinition));
                    }
                    catch(Exception ex)
                    {
                        //Log.Error(ex, typeof(T).ToString());
                        Console.WriteLine("MongoDbBase : " + ex);
                    }
                    
                    break;
                }
            }            
        }

        public async Task<List<T>> GetAllAsync(OptionalParam<PageParametersDto> paging = null, FilterDefinition<T> filterLocation = null, CancellationToken cancellationToken = default)
        {
            //string fieldName = "DeleteFlag";
            //bool checkProperty = false;
 
            //foreach (var property in typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance))
            //{
            //    if(property.Name == fieldName)
            //    {
            //        checkProperty = true;
            //        break;
            //    }
            //}
            var filter = Builders<T>.Filter.Empty;
            if (filterLocation != null)
            {
                filter &= filterLocation;
            }
            //if (checkProperty)
            //{
            //    filter &= Builders<T>.Filter.Eq(fieldName, false);
            //}
            if(paging != null)
            {
                var count = await Collection.CountDocumentsAsync(filter);
                paging.Value = new PageParametersDto((int)count, paging.Value.CurrentPage, paging.Value.PageSize);
                var options = new FindOptions<T>();
                if (paging.Value.CurrentPage > 0)
                {
                    options = new FindOptions<T> { Limit = paging.Value.PageSize, Skip = (paging.Value.CurrentPage - 1) * paging.Value.PageSize };
                }
                
                return (await Collection.FindAsync(filter, options)).ToList();
            }
            return (await Collection.FindAsync(filter)).ToList();
        }

        public async Task<T> GetByIndexAsync(Expression<Func<T, object>> index, object value, CancellationToken cancellationToken = default)
        {
            string fieldName;
            if (index.Body is MemberExpression)
            {
                fieldName = ((MemberExpression)index.Body).Member.Name;
            }
            else
            {
                var op = ((UnaryExpression)index.Body).Operand;
                fieldName = ((MemberExpression)op).Member.Name;
            }

            var filter = Builders<T>.Filter.Eq(fieldName, value);

            //string fieldDelete = "DeleteFlag";
            //bool checkProperty = false;
            //foreach (var property in typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance))
            //{
            //    if (property.Name == fieldDelete)
            //    {
            //        checkProperty = true;
            //        break;
            //    }
            //}
            //if (checkProperty)
            //{
            //    filter &= Builders<T>.Filter.Eq(fieldDelete, false);
            //}

            return (await Collection.FindAsync(filter)).FirstOrDefault();
        }

        public async Task<List<T>> GetListByIndexAsync(Expression<Func<T, object>> index, object value, CancellationToken cancellationToken = default)
        {
            string fieldName;
            if (index.Body is MemberExpression)
            {
                fieldName = ((MemberExpression)index.Body).Member.Name;
            }
            else
            {
                var op = ((UnaryExpression)index.Body).Operand;
                fieldName = ((MemberExpression)op).Member.Name;
            }

            var filter = Builders<T>.Filter.Eq(fieldName, value);

            //string fieldDelete = "DeleteFlag";
            //bool checkProperty = false;
            //foreach (var property in typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance))
            //{
            //    if (property.Name == fieldDelete)
            //    {
            //        checkProperty = true;
            //        break;
            //    }
            //}
            //if (checkProperty)
            //{
            //    filter &= Builders<T>.Filter.Eq(fieldDelete, false);
            //}

            return (await Collection.FindAsync(filter))?.ToList();
        }

        public Task RemoveAsync(T obj)
        {
            throw new NotImplementedException();
        }

        public virtual async Task<bool> UpdateAsync(Expression<Func<T, object>> index, T obj, bool isCreate, CancellationToken cancellationToken = default)
        {
            var indexProperty = ((MemberExpression)index.Body).Member as PropertyInfo;
            var filter = Builders<T>.Filter.Eq(indexProperty.Name, indexProperty.GetValue(obj));
            //filter &= Builders<T>.Filter.Eq("DeleteFlag", false);
            var update = Builders<T>.Update;
            var updates = new List<UpdateDefinition<T>>();

            // Check if data has existed
            var existing = (await Collection.FindAsync(filter)).FirstOrDefault();

            if (existing == null && !isCreate) return false;
            if (existing != null && isCreate) return false;

            foreach (var property in obj.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance))
            {
                var value = property.GetValue(obj);
                if (value != null)
                {                    
                    if(value is DateTime)
                    {
                        if((DateTime)value == DateTime.MinValue)
                        {
                            value = new DateTime(2000,1,1)  ;
                        }
                    }
                    if(value is string)
                    {
                        value = value.ToString().Trim() ;
                    }

                    updates.Add(update.Set(property.Name, value));
                }    
                    
            }

            var updateResult = await Collection.UpdateOneAsync(filter, update.Combine(updates), new UpdateOptions { IsUpsert = true });
            
            if (isCreate)
                return (updateResult.IsAcknowledged && updateResult.MatchedCount == 0);
            else
                return (updateResult.IsAcknowledged && updateResult.MatchedCount > 0);

        }

        public async Task<List<T>> FindNear(Expression<Func<T, object>> field, double longitude, double latitude, double maxDistanceInKm)
        {
            var point = GeoJson.Point(GeoJson.Geographic(longitude, latitude));
            var filter = Builders<T>.Filter.Near(field, point, maxDistanceInKm * 1000);
            //string fieldDelete = "DeleteFlag";
            //bool checkProperty = false;
            //foreach (var property in typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance))
            //{
            //    if (property.Name == fieldDelete)
            //    {
            //        checkProperty = true;
            //        break;
            //    }
            //}
            //if (checkProperty)
            //{
            //    filter &= Builders<T>.Filter.Eq(fieldDelete, false);
            //}

            return (await Collection.FindAsync(filter)).ToList();
        }

        public virtual async Task<bool> CreateListAsync(Expression<Func<T, object>> index, IEnumerable<T> entities, bool isCreate, CancellationToken cancellationToken = default)
        {
            var bulkOps = new List<UpdateOneModel<T>>();

            foreach (var doc in entities)
            {
                var update = Builders<T>.Update;
                var updates = new List<UpdateDefinition<T>>();
                var indexProperty = ((MemberExpression)index.Body).Member as PropertyInfo;
                var filter = Builders<T>.Filter.Eq(indexProperty.Name, indexProperty.GetValue(doc));
                var existing = (await Collection.FindAsync(filter)).FirstOrDefault();

                if (existing == null && !isCreate) return false;
                if (existing != null && isCreate) return false;

                foreach (var property in doc.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance))
                {
                    var value = property.GetValue(doc);
                    if (value != null)
                    {
                        if (value is DateTime)
                        {
                            if ((DateTime)value == DateTime.MinValue)
                            {
                                value = new DateTime(2000, 1, 1);
                            }
                        }
                        if (value is string)
                        {
                            value = value.ToString().Trim();
                        }
                        updates.Add(update.Set(property.Name, value));
                        var upsertOne = new UpdateOneModel<T>(filter, update.Combine(updates)) { IsUpsert = true };
                        bulkOps.Add(upsertOne);
                    }
                }
            }
            BulkWriteResult result = await Collection.BulkWriteAsync(bulkOps);
            return true;
        }

    }
}
