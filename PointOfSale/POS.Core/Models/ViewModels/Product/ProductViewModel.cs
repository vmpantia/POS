using POS.Core.Models.ViewModels.Category;
using POS.Domain.Models.Enums;

namespace POS.Core.Models.ViewModels.Product
{
    public class ProductViewModel
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public CommonStatus Status { get; set; }
        public string StatusDescription => Status.ToString();

        public CategoryLiteViewModel Category { get; set; }
    }
}
