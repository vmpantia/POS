using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using POS.Domain.Contracts.Repositories;
using POS.Infrastructure.Database.Contexts;
using POS.Infrastructure.Database.Repositories;

namespace POS.Infrastructure.Extensions
{
    public static class ServiceExtension
    {
        public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<POSDbContext>(opt => opt.UseSqlServer(configuration.GetConnectionString("MigrationDb")));
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
        }
    }
}
