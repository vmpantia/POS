using POS.Domain.Models.Enums;

namespace POS.Domain.Response
{
    public class Result<TData>
    {
        private Result(TData data)
        {
            IsSuccess = true;
            Data = data;
            Error = null;
        }

        private Result(Error error)
        {
            IsSuccess = false;
            Data = default;
            Error = error;
        }
        
        public bool IsSuccess { get; }
        public TData? Data { get; }
        public Error? Error { get; }

        public static Result<TData> Success(TData? data) => new(data);
        public static Result<TData> Failure(Error error) => new(error);
    }

    public sealed record Error(ErrorCode Code, string Type, string Description) { }
}
