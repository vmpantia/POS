using MediatR;
using POS.Core.Models.ViewModels.Product;
using POS.Domain.Response;

namespace POS.Core.Queries.Models.Product
{
    public record GetProductByIdQuery(Guid Id) : IRequest<Result<ProductViewModel>> { }
}
