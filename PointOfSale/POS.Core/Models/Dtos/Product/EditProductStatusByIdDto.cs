using POS.Domain.Models.Enums;

namespace POS.Core.Models.Dtos.Product
{
    public class EditProductStatusByIdDto
    {
        public CommonStatus NewStatus { get; set; }
    }
}
