using DataAccess.Models;
using DataAccess.Services;
using DataAccess.Services.Interfaces;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SsoGroup.Extensions;
using SsoGroup.Settings;
using System;

namespace SsoGroup
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var mongoDbSettings = Configuration.GetSection(nameof(MongoDbConfig)).Get<MongoDbConfig>();

            services.AddIdentity<Users, Roles>(
                options =>
                {
                    options.Password.RequireDigit = false;
                    options.Password.RequiredLength = 1;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireLowercase = false;
                }
                )
                .AddDefaultTokenProviders()
                .AddMongoDbStores<Users, Roles, Guid>
                (
                    mongoDbSettings.ConnectionString, mongoDbSettings.Name
                );

            var identityServerSettings = Configuration.GetSection(nameof(IdentityServerSettings)).Get<IdentityServerSettings>();

            //foreach (var item in identityServerSettings.ApiResources)
            //{
            //    item.ApiSecrets.Add(new Secret("secret_for_the_api".Sha512()));
            //}
            services.AddScoped<IProfileService, ProfileService>();

            services.GetConfigureDB(Configuration);

            //services.AddIdentityServer(options =>
            //    {
            //        options.Events.RaiseErrorEvents = true;
            //        options.Events.RaiseFailureEvents = true;
            //        options.Events.RaiseSuccessEvents = true;
            //    })
            //    .AddAspNetIdentity<Users>()
            //    .AddInMemoryApiScopes(identityServerSettings.ApiScopes)
            //    .AddInMemoryApiResources(identityServerSettings.ApiResources)
            //    .AddInMemoryClients(identityServerSettings.Clients)
            //    .AddInMemoryIdentityResources(identityServerSettings.IdentityResources)
            //     .AddProfileService<ProfileService>()
            //    .AddDeveloperSigningCredential();
            services
           .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
             .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
             {
                 options.Authority = Configuration["ResourceConfig:Authority"];
                 options.RequireHttpsMetadata = false;
                 options.Audience = Configuration["ResourceConfig:Audience"];
                 //options.TokenValidationParameters.RoleClaimType = "ussername";
                 //custom identity name
                 options.TokenValidationParameters.NameClaimType = "username";
             })
           .AddCookie(options =>
               {
                   // add an instance of the patched manager to the options:
                   options.CookieManager = new ChunkingCookieManager();

                   options.Cookie.HttpOnly = true;
                   options.Cookie.SameSite = SameSiteMode.None;
                   options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
               }).AddGoogle(googleOptions =>
               {
                   // Đọc thông tin Authentication:Google từ appsettings.json
                   IConfigurationSection googleAuthNSection = Configuration.GetSection("Authentication:Google");

                   // Thiết lập ClientID và ClientSecret để truy cập API google
                   googleOptions.ClientId = googleAuthNSection["ClientId"];
                   googleOptions.ClientSecret = googleAuthNSection["ClientSecret"];
                   // Cấu hình Url callback lại từ Google (không thiết lập thì mặc định là /signin-google)
                   googleOptions.CallbackPath = "/dang-nhap-tu-google";

               });

            ;
            // add internal service 
            services.AddTransient<IUserManageService, UserManageService>();

            services.AddControllers();
            services.AddControllersWithViews();

            //IdentityModelEventSource.ShowPII = true; //Add this line
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

            }
            //app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.All
            });

            app.UseRouting();
            app.UseIdentityServer();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCookiePolicy(new CookiePolicyOptions { MinimumSameSitePolicy = SameSiteMode.Lax });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
