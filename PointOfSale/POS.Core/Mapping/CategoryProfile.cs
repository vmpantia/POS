using AutoMapper;
using POS.Core.Models.ViewModels.Category;
using POS.Domain.Models.Entities;

namespace POS.Core.Mapping
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<Category, CategoryLiteViewModel>();
        }
    }
}
