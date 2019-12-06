using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using ReduxWebApp.Models;
using System;

namespace ReduxWebApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            const string signingSecurityKey = "0d5b3235a8b403c3dab9c3f4f65c07fcalskd234n1k41230";
            var signingKey = new SigningSymmetricKey(signingSecurityKey);
            services.AddSingleton<IJwtSigningEncodingKey>(signingKey);

            services.AddControllersWithViews();
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=WebAppDb;Trusted_Connection=True;"));
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme);
            services.AddMemoryCache();
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            const string jwtSchemeName = "JwtBearer";
            var signingDecodingKey = (IJwtSigningDecodingKey)signingKey;
            services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = jwtSchemeName;
                options.DefaultChallengeScheme = jwtSchemeName;
            })
                .AddJwtBearer(jwtSchemeName, jwtBearerOptions => {
                    jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = signingDecodingKey.GetKey(),

                        ValidateIssuer = true,
                        ValidIssuer = "ReduxWebApp",

                        ValidateAudience = true,
                        ValidAudience = "ReduxWebAppClient",

                        ValidateLifetime = true,

                        ClockSkew = TimeSpan.FromSeconds(3)
                    };
                });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");

                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
