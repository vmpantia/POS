namespace POS.Core.Extensions
{
    public class GeneratorExtension
    {
        public static string GenerateRandomNumber(string format, DateTime currentDate, int noOfDigits)
        {
            var randomNumbers = string.Empty;
            Random random = new();

            for (int i = 0; i < noOfDigits; i++)
                randomNumbers += random.Next(0, 9); // Generates a random number

            return string.Format(format, currentDate.ToString("yyMM"), randomNumbers);
        }
    }
}
