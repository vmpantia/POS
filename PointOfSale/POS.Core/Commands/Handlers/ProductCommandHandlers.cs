using MediatR;
using POS.Core.Commands.Models.Product;
using POS.Domain.Contracts.Repositories;
using POS.Domain.Models.Enums;
using POS.Domain.Response;
using POS.Domain.Response.Errors;

namespace POS.Core.Commands.Handlers
{
    public class ProductCommandHandlers :
        IRequestHandler<DeleteProductByIdCommand, Result<string>>,
        IRequestHandler<EditProductByIdCommand, Result<string>>
    {
        private readonly IProductRepository _product;
        private readonly ICategoryRepository _category;
        public ProductCommandHandlers(IProductRepository product, ICategoryRepository category)
        {
            _product = product;
            _category = category;
        }

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

        public async Task<Result<string>> Handle(EditProductByIdCommand request, CancellationToken cancellationToken)
        {
            // Get product by id in the database
            var product = await _product.GetProductByIdAsync(request.Id);

            // Check if product exist
            if (product is null) return Result<string>.Failure(ProductErrors.NotFound(request.Id));

            // Check if new category id exist
            if(!await _category.IsCategoryExistAsync(data => data.Id == request.CategoryId &&
                                                             data.Status != CommonStatus.Deleted))
                return Result<string>.Failure(CategoryErrors.NotFound(request.CategoryId));

            // Update product
            product.CategoryId = request.CategoryId;
            product.Name = request.Name;
            product.Description = request.Description;
            product.UpdatedBy = request.Requestor;
            product.UpdatedAt = DateTime.Now;
            await _product.UpdateProductAsync(product);

            return Result<string>.Success("Product updated succesfully in the database.");
        }
    }
}
