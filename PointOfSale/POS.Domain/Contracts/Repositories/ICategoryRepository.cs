using POS.Domain.Models.Entities;
using System.Linq.Expressions;

namespace POS.Domain.Contracts.Repositories
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<bool> IsCategoryExistAsync(Expression<Func<Category, bool>> expression);
    }
}