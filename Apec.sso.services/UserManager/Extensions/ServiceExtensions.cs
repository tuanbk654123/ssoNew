using DataAccess.MongoDbHelper;
using DataAccess.Services;
using DataAccess.Services.Interfaces;

using Microsoft.OpenApi.Models;
using UserManager.Repositories;
using UserManager.Repositories.Interfaces;
using UserManager.Services;
using UserManager.Services.Interfaces;

namespace UserManager.Extensions
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
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "User Manager Server", Version = "v1" });
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

        public static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IRoleService, RoleService>();
            services.AddTransient<IRoleRepository, RoleRepository>();
            services.AddTransient<IUserLoginService, UserLoginService>();
            services.AddTransient<IUserLoginRepository, UserLoginRepository>();

            services.AddTransient<IClientService, ClientService>();
            services.AddTransient<IClientRepository, ClientRepository>();
            services.AddTransient<IApiResourcesService, ApiResourcesService>();
            services.AddTransient<IApiResourcesRepository, ApiResourcesRepository>();
            services.AddTransient<IApiScopesService, ApiScopesService>();
            services.AddTransient<IApiScopesRepository, ApiScopesRepository>();

        }

        public static void ConfigureIdentity(this IServiceCollection services, IConfiguration configuration)
        {
            var ISsoGroupService = configuration.GetValue<string>("ISsoGroupService:BaseUrl", "https://localhost:5001");
            // Add services to the container.
            services.AddAuthentication("Bearer")
                .AddIdentityServerAuthentication("Bearer", options =>
                {
                    options.Authority = ISsoGroupService;
                    options.ApiName = "ApiSsoManager";
                    options.RequireHttpsMetadata = false;
                });

        }
        public static void ConfigureInternalServices(this IServiceCollection services)
        {
            services.AddTransient<ISsoGroupService, SsoGroupService>();
        }
    }
}