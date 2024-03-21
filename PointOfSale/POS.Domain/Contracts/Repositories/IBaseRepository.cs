using POS.Domain.Models.Entities;
using System.Linq.Expressions;

namespace POS.Domain.Contracts.Repositories
{
    public interface IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        IQueryable<TEntity> GetByExpression(Expression<Func<TEntity, bool>> expression);
    }
}