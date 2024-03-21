using Bogus;
using Bogus.Extensions.UnitedStates;
using POS.Domain.Models.Entities;
using POS.Domain.Models.Enums;

namespace POS.Domain.Stubs
{
    public static class FakeData
    {
        public static Faker<Category> FakerCategory() =>
            new Faker<Category>()
                    .RuleFor(prop => prop.Id, faker => faker.Random.Guid())
                    .RuleFor(prop => prop.Name, faker => faker.Commerce.Categories(1).First())
                    .RuleFor(prop => prop.Status, faker => faker.PickRandom<CommonStatus>())
                    .RuleFor(prop => prop.CreatedAt, faker => faker.Date.Past())
                    .RuleFor(prop => prop.CreatedBy, faker => faker.Internet.Email());

        public static Faker<Product> FakerProduct(IEnumerable<Guid> categoryIds) =>
            new Faker<Product>()
                    .RuleFor(prop => prop.Id, faker => faker.Random.Guid())
                    .RuleFor(prop => prop.CategoryId, faker => faker.PickRandom(categoryIds))
                    .RuleFor(prop => prop.Code, faker => faker.Company.Ein())
                    .RuleFor(prop => prop.Name, faker => faker.Commerce.ProductName())
                    .RuleFor(prop => prop.Description, faker => faker.Commerce.ProductDescription())
                    .RuleFor(prop => prop.Status, faker => faker.PickRandom<CommonStatus>())
                    .RuleFor(prop => prop.CreatedAt, faker => faker.Date.Past())
                    .RuleFor(prop => prop.CreatedBy, faker => faker.Internet.Email());
    }
}
