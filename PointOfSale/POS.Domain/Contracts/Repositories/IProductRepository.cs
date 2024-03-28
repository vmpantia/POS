using POS.Domain.Models.Entities;
using System.Linq.Expressions;

namespace POS.Domain.Contracts.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product?> GetProductByIdAsync(Guid id);
        Task<Product?> GetProductByExpressionAsync(Expression<Func<Product, bool>> expression);
        Task UpdateProductAsync(Product product);
        Task AddProductAsync(Product product);
        Task<bool> IsProductExistAsync(Expression<Func<Product, bool>> expression);
    }
}