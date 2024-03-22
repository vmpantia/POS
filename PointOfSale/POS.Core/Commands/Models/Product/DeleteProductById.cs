using MediatR;
using POS.Domain.Response;

namespace POS.Core.Commands.Models.Product
{
    public record DeleteProductById(Guid Id, string Requestor = "") : IRequest<Result<string>> { }
}
