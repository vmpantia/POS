using MediatR;
using POS.Core.Models.Dtos.Product;
using POS.Domain.Response;

namespace POS.Core.Commands.Models.Product
{
    public class EditProductByIdCommand : IRequest<Result<string>>
    {
        public EditProductByIdCommand(Guid id, EditProductByIdDto request, string requestor = "") 
        {
            Id = id;
            CategoryId = request.CategoryId;
            Name = request.Name;
            Description = request.Description;
            Requestor = requestor;
        }

        public Guid Id { get; init; }
        public Guid CategoryId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string Requestor { get; init; }
    }
}
