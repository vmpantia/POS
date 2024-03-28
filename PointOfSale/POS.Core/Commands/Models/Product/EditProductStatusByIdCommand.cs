using MediatR;
using POS.Core.Models.Dtos.Product;
using POS.Domain.Models.Enums;
using POS.Domain.Response;

namespace POS.Core.Commands.Models.Product
{
    public class EditProductStatusByIdCommand : IRequest<Result<string>>
    {
        public EditProductStatusByIdCommand(Guid id, EditProductStatusByIdDto request, string requestor = "") 
        {
            Id = id;
            NewStatus = request.NewStatus;
            Requestor = requestor;
        }

        public Guid Id { get; init; }
        public CommonStatus NewStatus { get; set; }
        public string Requestor { get; init; }
    }
}
