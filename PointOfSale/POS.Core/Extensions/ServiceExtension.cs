using Microsoft.Extensions.DependencyInjection;
using POS.Core.Helpers;
using POS.Domain.Helpers;
using System.Reflection;

namespace POS.Core.Extensions
{
    public static class ServiceExtension
    {
        public static void AddCore(this IServiceCollection services)
        {
            services.AddMediatR(config => config.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddScoped<IProductHelper, ProductHelper>();
        }
    }
}
