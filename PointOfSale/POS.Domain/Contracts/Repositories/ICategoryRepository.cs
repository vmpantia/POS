using POS.Domain.Models.Entities;

namespace POS.Domain.Contracts.Repositories
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
    }
}