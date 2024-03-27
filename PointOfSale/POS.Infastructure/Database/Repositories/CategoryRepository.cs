using Microsoft.EntityFrameworkCore;
using POS.Domain.Contracts.Repositories;
using POS.Domain.Models.Entities;
using POS.Domain.Models.Enums;
using POS.Infrastructure.Database.Contexts;

namespace POS.Infrastructure.Database.Repositories
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(POSDbContext context) : base(context) { }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync() =>
            await base.GetByExpression(data => data.Status != CommonStatus.Deleted)
                      .ToListAsync();
    }
}
