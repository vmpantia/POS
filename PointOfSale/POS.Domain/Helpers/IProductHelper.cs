namespace POS.Domain.Helpers
{
    public interface IProductHelper
    {
        Task<string> GenerateProductCodeAsync(DateTime currentDate, int noOfdigits = 5);
    }
}
