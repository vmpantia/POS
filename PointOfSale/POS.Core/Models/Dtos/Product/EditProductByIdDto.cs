namespace POS.Core.Models.Dtos.Product
{
    public class EditProductByIdDto
    {
        public Guid CategoryId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
    }
}
