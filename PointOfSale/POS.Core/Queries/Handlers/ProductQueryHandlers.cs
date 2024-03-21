using AutoMapper;
using MediatR;
using POS.Core.Models.ViewModels.Product;
using POS.Core.Queries.Models.Product;
using POS.Domain.Contracts.Repositories;
using POS.Domain.Response;
using POS.Domain.Response.Errors;

namespace POS.Core.Queries.Handlers
{
    public class ProductQueryHandlers :
        IRequestHandler<GetAllProducts, Result<IEnumerable<ProductViewModel>>>
    {
        private readonly IProductRepository _product;
        private readonly IMapper _mapper;
        public ProductQueryHandlers(IProductRepository product, IMapper mapper)
        {
            _product = product;
            _mapper = mapper;
        }

        public async Task<Result<IEnumerable<ProductViewModel>>> Handle(GetAllProducts request, CancellationToken cancellationToken)
        {
            // Get all products stored in the database
            var products = await _product.GetAllProductsAsync();

            // Check if products is NULL
            if(products is null) Result<IEnumerable<ProductViewModel>>.Failure(ProductErrors.NULL);

            // Convert products to product view models
            var data = _mapper.Map<IEnumerable<ProductViewModel>>(products);
            return Result<IEnumerable<ProductViewModel>>.Success(data);
        }
    }
}
