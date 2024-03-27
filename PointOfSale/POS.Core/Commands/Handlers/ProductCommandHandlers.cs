using MediatR;
using POS.Core.Commands.Models.Product;
using POS.Domain.Contracts.Repositories;
using POS.Domain.Response;
using POS.Domain.Response.Errors;

namespace POS.Core.Commands.Handlers
{
    public class ProductCommandHandlers :
        IRequestHandler<DeleteProductByIdCommand, Result<string>>
    {
        private readonly IProductRepository _product;
        public ProductCommandHandlers(IProductRepository product) => 
            _product = product;

        public async Task<Result<string>> Handle(DeleteProductByIdCommand request, CancellationToken cancellationToken)
        {
            // Get product by id in the database
            var product = await _product.GetProductByIdAsync(request.Id);

            // Check if product exist
            if (product is null) return Result<string>.Failure(ProductErrors.NotFound(request.Id));

            // Soft delete product
            product.Status = Domain.Models.Enums.CommonStatus.Deleted;
            product.DeletedBy = request.Requestor;
            product.DeletedAt = DateTime.Now;
            await _product.UpdateProductAsync(product);

            return Result<string>.Success("Product deleted succesfully in the database.");
        }
    }
}
