using MediatR;
using POS.Core.Commands.Models.Product;
using POS.Domain.Contracts.Repositories;
using POS.Domain.Helpers;
using POS.Domain.Models.Entities;
using POS.Domain.Models.Enums;
using POS.Domain.Response;
using POS.Domain.Response.Errors;

namespace POS.Core.Commands.Handlers
{
    public class ProductCommandHandlers :
        IRequestHandler<DeleteProductByIdCommand, Result<string>>,
        IRequestHandler<EditProductByIdCommand, Result<string>>,
        IRequestHandler<AddProductCommand, Result<string>>,
        IRequestHandler<EditProductStatusByIdCommand, Result<string>>
    {
        private readonly IProductRepository _product;
        private readonly IProductHelper _productHelper;
        private readonly ICategoryRepository _category;
        public ProductCommandHandlers(IProductRepository product, IProductHelper productHelper, ICategoryRepository category)
        {
            _product = product;
            _productHelper = productHelper;
            _category = category;
        }

        public async Task<Result<string>> Handle(DeleteProductByIdCommand request, CancellationToken cancellationToken)
        {
            // Get product by id in the database
            var product = await _product.GetProductByIdAsync(request.Id);

            // Check if product exist
            if (product is null) return Result<string>.Failure(ProductErrors.NotFound(request.Id));

            // Soft delete product
            product.Status = CommonStatus.Deleted;
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

        public async Task<Result<string>> Handle(AddProductCommand request, CancellationToken cancellationToken)
        {
            // Check if new category id exist
            if (!await _category.IsCategoryExistAsync(data => data.Id == request.CategoryId &&
                                                              data.Status != CommonStatus.Deleted))
                return Result<string>.Failure(CategoryErrors.NotFound(request.CategoryId));

            // Check if new product name is exist with certain category id
            if (await _product.IsProductExistAsync(data => data.Name == request.Name &&
                                                            data.CategoryId == request.CategoryId &&
                                                            data.Status != CommonStatus.Deleted))
                return Result<string>.Failure(ProductErrors.Exist(request.Name, request.CategoryId));

            // Add new product
            var newProductId = Guid.NewGuid();
            var newProduct = new Product
            {
                Id = Guid.NewGuid(),
                Code = await _productHelper.GenerateProductCodeAsync(DateTime.Now),
                CategoryId = request.CategoryId,
                Name = request.Name,
                Description = request.Description,
                ImagePath = null,
                CreatedBy = request.Requestor,
                CreatedAt = DateTime.Now,
            };
            await _product.AddProductAsync(newProduct);

            return Result<string>.Success("Product added succesfully in the database.");
        }

        public async Task<Result<string>> Handle(EditProductStatusByIdCommand request, CancellationToken cancellationToken)
        {
            // Check if the new status is valid
            if (request.NewStatus == CommonStatus.Deleted) return Result<string>.Failure(ProductErrors.InvalidValue(request.NewStatus));

            // Get product by id in the database
            var product = await _product.GetProductByIdAsync(request.Id);

            // Check if product exist
            if (product is null) return Result<string>.Failure(ProductErrors.NotFound(request.Id));

            // Check if the current status and new status is same
            if (product.Status == request.NewStatus) return Result<string>.Failure(ProductErrors.SameValue(product.Status, request.NewStatus));

            // Update product status
            product.Status = request.NewStatus;
            product.UpdatedBy = request.Requestor;
            product.UpdatedAt = DateTime.Now;
            await _product.UpdateProductAsync(product);

            return Result<string>.Success("Product status updated succesfully in the database.");
        }
    }
}
