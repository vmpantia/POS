using POS.Domain.Models.Enums;

namespace POS.Domain.Response.Errors
{
    public class CategoryErrors
    {
        public static Error NULL => new(ErrorCode.NULL, "Category", "Category(s) cannnot be NULL.");
    }
}
