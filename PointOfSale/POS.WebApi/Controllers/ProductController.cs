using MediatR;
using Microsoft.AspNetCore.Mvc;
using POS.Core.Commands.Models.Product;
using POS.Core.Models.Dtos.Product;
using POS.Core.Models.ViewModels.Product;
using POS.Core.Queries.Models.Product;
using POS.WebApi.Common;

namespace POS.WebApi.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductController : BaseController
    {
        public ProductController(IMediator mediator) : base(mediator) { }

        [HttpGet]
        public async Task<IActionResult> GetAllProductsAsync() =>
            await HandleRequestAsync<GetAllProductsQuery, IEnumerable<ProductViewModel>>(new GetAllProductsQuery());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductByIdAsync(Guid id) =>
            await HandleRequestAsync<GetProductByIdQuery, ProductViewModel>(new GetProductByIdQuery(id));

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductAsync(Guid id) =>
            await HandleRequestAsync<DeleteProductByIdCommand, string>(new DeleteProductByIdCommand(id));
        
        [HttpPut("{id}")]
        public async Task<IActionResult> EditProductAsync(Guid id, [FromBody] EditProductByIdDto request) =>
            await HandleRequestAsync<EditProductByIdCommand, string>(new EditProductByIdCommand(id, request));

        [HttpPost]
        public async Task<IActionResult> AddProductAsync([FromBody] AddProductDto request) =>
            await HandleRequestAsync<AddProductCommand, string>(new AddProductCommand(request));
    }
}
