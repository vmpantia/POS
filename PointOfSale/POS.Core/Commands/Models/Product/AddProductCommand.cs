using MediatR;
using POS.Core.Models.Dtos.Product;
using POS.Domain.Response;

namespace POS.Core.Commands.Models.Product
{
    public class AddProductCommand : IRequest<Result<string>>
    {
        public AddProductCommand(AddProductDto request, string requestor = "") 
        {
            CategoryId = request.CategoryId;
            Name = request.Name;
            Description = request.Description;
            Requestor = requestor;
        }

        public Guid CategoryId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string Requestor { get; init; }
    }
}
