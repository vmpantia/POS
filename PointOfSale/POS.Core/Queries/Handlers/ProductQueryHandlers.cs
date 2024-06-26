﻿using AutoMapper;
using MediatR;
using POS.Core.Models.ViewModels.Product;
using POS.Core.Queries.Models.Product;
using POS.Domain.Contracts.Repositories;
using POS.Domain.Models.Enums;
using POS.Domain.Response;
using POS.Domain.Response.Errors;

namespace POS.Core.Queries.Handlers
{
    public class ProductQueryHandlers :
        IRequestHandler<GetAllProductsQuery, Result<IEnumerable<ProductViewModel>>>,
        IRequestHandler<GetProductByIdQuery, Result<ProductViewModel>>
    {
        private readonly IProductRepository _product;
        private readonly IMapper _mapper;
        public ProductQueryHandlers(IProductRepository product, IMapper mapper)
        {
            _product = product;
            _mapper = mapper;
        }

        public async Task<Result<IEnumerable<ProductViewModel>>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
        {
            // Get all products stored in the database
            var products = await _product.GetAllProductsAsync();

            // Check if products is NULL
            if(products is null) return Result<IEnumerable<ProductViewModel>>.Failure(ProductErrors.NULL);

            // Convert products to product view models
            var data = _mapper.Map<IEnumerable<ProductViewModel>>(products);
            return Result<IEnumerable<ProductViewModel>>.Success(data);
        }

        public async Task<Result<ProductViewModel>> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
        {
            // Get product by id in the database
            var product = await _product.GetProductByExpressionAsync(data => data.Id == request.Id);

            // Check if products is NULL
            if (product is null) return Result<ProductViewModel>.Failure(ProductErrors.NotFound(request.Id));

            // Convert product to product view model
            var data = _mapper.Map<ProductViewModel>(product);
            return Result<ProductViewModel>.Success(data);
        }
    }
}
