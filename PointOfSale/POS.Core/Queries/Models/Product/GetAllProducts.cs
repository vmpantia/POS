using MediatR;
using POS.Core.Models.ViewModels.Product;
using POS.Domain.Response;

namespace POS.Core.Queries.Models.Product
{
    public class GetAllProducts : IRequest<Result<IEnumerable<ProductViewModel>>> { }
}
