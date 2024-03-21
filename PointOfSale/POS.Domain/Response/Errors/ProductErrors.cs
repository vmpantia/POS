using POS.Domain.Models.Enums;

namespace POS.Domain.Response.Errors
{
    public class ProductErrors
    {
        public static Error NULL => new(ErrorCode.NULL, "Product", "Product(s) cannnot be NULL.");
    }
}
