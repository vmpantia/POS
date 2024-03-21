using AutoMapper;
using POS.Core.Models.ViewModels.Product;
using POS.Domain.Models.Entities;

namespace POS.Core.Mapping
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<Product, ProductViewModel>();
        }
    }
}
