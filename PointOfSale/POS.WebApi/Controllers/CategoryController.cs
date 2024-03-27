using MediatR;
using Microsoft.AspNetCore.Mvc;
using POS.Core.Models.ViewModels.Category;
using POS.Core.Queries.Models.Category;
using POS.WebApi.Common;

namespace POS.WebApi.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoryController : BaseController
    {
        public CategoryController(IMediator mediator) : base(mediator) { }

        [HttpGet("lites")]
        public async Task<IActionResult> GetAllCategoryLitesAsync() =>
            await HandleRequestAsync<GetAllCategoryLites, IEnumerable<CategoryLiteViewModel>>(new GetAllCategoryLites());
    }
}
