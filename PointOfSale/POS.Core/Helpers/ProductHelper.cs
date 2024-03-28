using POS.Core.Extensions;
using POS.Domain.Common;
using POS.Domain.Contracts.Repositories;
using POS.Domain.Helpers;

namespace POS.Core.Helpers
{
    public class ProductHelper : IProductHelper
    {
        private readonly IProductRepository _product;
        public ProductHelper(IProductRepository product) =>
            _product = product;

        public async Task<string> GenerateProductCodeAsync(DateTime currentDate, int noOfdigits = 5)
        {
            bool isUnique = false;
            var newProductCode = GeneratorExtension.GenerateRandomNumber(Constants.PRODUCT_CODE_FORMAT, currentDate, noOfdigits);

            while (!isUnique)
            {
                if (await _product.IsProductExistAsync(data => data.Code == newProductCode))
                    newProductCode = GeneratorExtension.GenerateRandomNumber(Constants.PRODUCT_CODE_FORMAT, currentDate, noOfdigits);
                else
                    isUnique = true;
            }

            return newProductCode;
        }
    }
}
