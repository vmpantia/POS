using POS.Domain.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace POS.Domain.Models.Entities
{
    public class BaseEntity
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public CommonStatus Status { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required, StringLength(50)]
        public string CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        [StringLength(50)]
        public string? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        [StringLength(50)]
        public string? DeletedBy { get; set; }
    }
}
