using System.ComponentModel.DataAnnotations;

namespace POS.Domain.Models.Entities
{
    public class Category : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        [StringLength(255)]
        public string? Description { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
