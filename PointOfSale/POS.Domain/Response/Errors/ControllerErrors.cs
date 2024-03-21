using POS.Domain.Models.Enums;

namespace POS.Domain.Response.Errors
{
    public class ControllerErrors
    {
        public static Error Unexpected(Exception exception) => new(ErrorCode.Unexpected, nameof(exception), exception.ToString());
    }
}
