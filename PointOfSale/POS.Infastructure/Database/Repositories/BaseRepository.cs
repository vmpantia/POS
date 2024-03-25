using Microsoft.EntityFrameworkCore;
using POS.Domain.Contracts.Repositories;
using POS.Domain.Models.Entities;
using POS.Infrastructure.Database.Contexts;
using System.Linq.Expressions;

namespace POS.Infrastructure.Database.Repositories
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        protected POSDbContext _context;
        protected DbSet<TEntity> _table;
        public BaseRepository(POSDbContext context)
        {
            _context = context;
            _table = context.Set<TEntity>();
        }

        public IQueryable<TEntity> GetByExpression(Expression<Func<TEntity, bool>> expression) =>
             _table.Where(expression)
                   .AsNoTracking();

        public async Task<TEntity?> GetOneByIdAsync<TId>(TId id) =>
            await _table.FindAsync(id);

        public async Task<TEntity?> GetOneByExpressionAsync(Expression<Func<TEntity, bool>> expression) =>
             await _table.FirstOrDefaultAsync(expression);

        public async Task UpdateAsync(TEntity entity)
        {
            _table.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
