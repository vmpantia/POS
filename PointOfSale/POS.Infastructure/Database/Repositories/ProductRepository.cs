using Microsoft.EntityFrameworkCore;
using POS.Domain.Contracts.Repositories;
using POS.Domain.Models.Entities;
using POS.Domain.Models.Enums;
using POS.Infrastructure.Database.Contexts;

namespace POS.Infrastructure.Database.Repositories
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        public ProductRepository(POSDbContext context) : base(context) { }

        public async Task<IEnumerable<Product>> GetAllProductsAsync() =>
            await base.GetByExpression(data => data.Status != CommonStatus.Deleted &&
                                                      data.Category.Status != CommonStatus.Deleted)
                      .Include(tbl => tbl.Category)
                      .ToListAsync();

        public async Task<Product?> GetProductByIdAsync(Guid id) =>
            await base.GetOneByIdAsync(id);

        public async Task UpdateProductAsync(Product product) =>
            await base.UpdateAsync(product);
    }
}
