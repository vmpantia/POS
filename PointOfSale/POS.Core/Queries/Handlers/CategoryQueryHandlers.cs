using AutoMapper;
using MediatR;
using POS.Core.Models.ViewModels.Category;
using POS.Core.Queries.Models.Category;
using POS.Domain.Contracts.Repositories;
using POS.Domain.Response;
using POS.Domain.Response.Errors;

namespace POS.Core.Queries.Handlers
{
    public class CategoryQueryHandlers :
        IRequestHandler<GetAllCategoryLitesQuery, Result<IEnumerable<CategoryLiteViewModel>>>
    {
        private readonly ICategoryRepository _category;
        private readonly IMapper _mapper;
        public CategoryQueryHandlers(ICategoryRepository category, IMapper mapper)
        {
            _category = category;
            _mapper = mapper;
        }

        public async Task<Result<IEnumerable<CategoryLiteViewModel>>> Handle(GetAllCategoryLitesQuery request, CancellationToken cancellationToken)
        {
            // Get all categories stored in the database
            var categories = await _category.GetAllCategoriesAsync();

            // Check if products is NULL
            if (categories is null) return Result<IEnumerable<CategoryLiteViewModel>>.Failure(CategoryErrors.NULL);

            // Convert categories to category view models
            var data = _mapper.Map<IEnumerable<CategoryLiteViewModel>>(categories);
            return Result<IEnumerable<CategoryLiteViewModel>>.Success(data);
        }
    }
}
