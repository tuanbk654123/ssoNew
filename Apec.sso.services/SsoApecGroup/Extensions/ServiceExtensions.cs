using DataAccess.Models;
using DataAccess.MongoDbHelper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;
using MongoDbGenericRepository;
using SsoGroup.Settings;
using System;
using System.Collections.Generic;
using System.Linq;


namespace SsoGroup.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
        }



        public static void ConfigureSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Fire Authen Server", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Authorization header using the Bearer scheme.
                      Enter 'Bearer' [space] and then your token in the text input below.
                      Example: 'Bearer 12345abcdef'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        },
                        new List<string>()
                    }
                });
            });
        }

        public static void ConfigureMongoDB(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddMongoDb(configuration);

        }
        public static void GetConfigureDB(this IServiceCollection services, IConfiguration configuration)
        {
            // get data form appsetting
            var identityServerSettings = configuration.GetSection(nameof(IdentityServerSettings)).Get<IdentityServerSettings>();
            // get dbContext
            var dbContext = (IMongoDbContext)services.BuildServiceProvider().GetService(typeof(IMongoDbContext));

            //#region SeedData ApiResource

            // get apiResource ======================================================================================================
            var collectionApiResoure = dbContext.GetCollection<ApiResources>();
            List<ApiResources> apiResources = collectionApiResoure.Find(Builders<ApiResources>.Filter.Empty).ToList();
            var lstNeedCRUD =
                from a in identityServerSettings.ApiResources
                join b in apiResources
                    on a.Name equals b.Name into ab
                from c in ab.DefaultIfEmpty()
                where c == null
                select new ApiResources
                {
                    Name = a.Name,
                    Scopes = a.Scopes,
                    //ApiSecrets = a.ApiSecrets,
                    //UserClaims = a.UserClaims,
                    Id = Guid.NewGuid().ToString()
                };

            // nếu chưa có trong DB thêm vào
            if (lstNeedCRUD.Any())
            {
                collectionApiResoure.InsertMany(lstNeedCRUD);
            }
            //#endregion

            #region SeedData Client

            // get Client ======================================================================================================
            var collectionClients = dbContext.GetCollection<Clients>();

            List<Clients> clients = collectionClients.Find(Builders<Clients>.Filter.Empty).ToList();
            var lstNeedCRUD_Client =
                from a in identityServerSettings.Clients
                join b in clients
                    on a.ClientName equals b.ClientName into ab
                from c in ab.DefaultIfEmpty()
                where c == null
                select new Clients
                {
                    ClientName = a.ClientName,
                    ClientUri = a.ClientUri,
                    ClientId = a.ClientId,
                    ClientSecrets = a.ClientSecrets,

                    AllowedGrantTypes = a.AllowedGrantTypes,
                    RequireClientSecret = a.RequireClientSecret,

                    RedirectUris = a.RedirectUris,
                    PostLogoutRedirectUris = a.PostLogoutRedirectUris,
                    AllowedCorsOrigins = a.AllowedCorsOrigins,
                    AllowedScopes = a.AllowedScopes,
                    AllowAccessTokensViaBrowser = a.AllowAccessTokensViaBrowser,

                    Id = Guid.NewGuid().ToString()
                };

            // nếu chưa có trong DB thêm vào           
            if (lstNeedCRUD_Client.Any())
            {
                collectionClients.InsertMany(lstNeedCRUD_Client);
            }

            #endregion


            #region SeedData ApiScopes
            // get apiResource ======================================================================================================
            var collectionApiScopes = dbContext.GetCollection<ApiScopes>();

            List<ApiScopes> apiScopes = collectionApiScopes.Find(Builders<ApiScopes>.Filter.Empty).ToList();
            var lstNeedCRUD_ApiScopes =
                from a in identityServerSettings.ApiScopes
                join b in apiScopes
                    on a.Name equals b.Name into ab
                from c in ab.DefaultIfEmpty()
                where c == null
                select new ApiScopes
                {
                    Name = a.Name,

                    Id = Guid.NewGuid().ToString()
                };

            // nếu chưa có trong DB thêm vào           
            if (lstNeedCRUD_ApiScopes.Any())
            {
                collectionApiScopes.InsertMany(lstNeedCRUD_ApiScopes);
            }


            #endregion


            // get IdentityResources ======================================================================================================
            var collectionIdentityResources = dbContext.GetCollection<DataAccess.Models.IdentityResources>();
            var filterIdentityResources = Builders<DataAccess.Models.IdentityResources>.Filter.Empty;

            List<DataAccess.Models.IdentityResources> apiIdentityResources2 = collectionIdentityResources.Find(filterIdentityResources).ToList();


            services.AddIdentityServer(options =>
            {
                options.Events.RaiseErrorEvents = true;
                options.Events.RaiseFailureEvents = true;
                options.Events.RaiseSuccessEvents = true;
            })
            .AddAspNetIdentity<Users>()
            .AddInMemoryApiScopes(apiScopes)
            .AddInMemoryApiResources(apiResources)
            .AddInMemoryClients(clients)
            .AddInMemoryIdentityResources(identityServerSettings.IdentityResources)
             .AddProfileService<ProfileService>()
            .AddDeveloperSigningCredential();


        }

    }
}