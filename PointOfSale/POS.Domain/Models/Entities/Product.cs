using System.ComponentModel.DataAnnotations;

namespace POS.Domain.Models.Entities
{
    public class Product : BaseEntity
    {
        [Required]
        public Guid CategoryId { get; set; }
        [Required, StringLength(20)]
        public string Code { get; set; }
        [Required, StringLength(50)]
        public string Name { get; set; }
        [StringLength(255)]
        public string? Description { get; set; }
        public string? ImagePath { get; set; }

        public virtual Category Category { get; set; }
    }
}
