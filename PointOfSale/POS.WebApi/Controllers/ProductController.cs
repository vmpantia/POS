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

        [HttpDelete]
        public async Task<IActionResult> DeleteProductAsync([FromBody] DeleteProductDto request) =>
            await HandleRequestAsync<DeleteProductByIdCommand, string>(new DeleteProductByIdCommand(request.Id));
    }
}
