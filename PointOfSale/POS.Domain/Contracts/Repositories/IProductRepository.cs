using POS.Domain.Models.Entities;

namespace POS.Domain.Contracts.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product?> GetProductByIdAsync(Guid id);
        Task UpdateProductAsync(Product product);
    }
}