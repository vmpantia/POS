using MediatR;
using POS.Core.Models.ViewModels.Category;
using POS.Domain.Response;

namespace POS.Core.Queries.Models.Category
{
    public class GetAllCategoryLitesQuery : IRequest<Result<IEnumerable<CategoryLiteViewModel>>> { }
}
