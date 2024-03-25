using POS.Domain.Models.Entities;
using System.Linq.Expressions;

namespace POS.Domain.Contracts.Repositories
{
    public interface IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        IQueryable<TEntity> GetByExpression(Expression<Func<TEntity, bool>> expression);
        Task<TEntity?> GetOneByIdAsync<TId>(TId id);
        Task<TEntity?> GetOneByExpressionAsync(Expression<Func<TEntity, bool>> expressiond);
        Task UpdateAsync(TEntity entity); 
    }
}