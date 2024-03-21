using Microsoft.EntityFrameworkCore;
using POS.Domain.Models.Entities;
using POS.Domain.Stubs;

namespace POS.Infrastructure.Database.Contexts
{
    public class POSDbContext : DbContext
    {
        private List<Category> _stubCategories = new List<Category>();
        private List<Product> _stubProducts = new List<Product>();
        public POSDbContext(DbContextOptions options) : base(options)
        {
            // Generate fake categories
            _stubCategories = FakeData.FakerCategory()
                                      .Generate(10);

            // Generate fake products
            _stubProducts = FakeData.FakerProduct(_stubCategories.Select(data => data.Id))
                                    .Generate(1000);
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
                // Relationships
                entity.HasOne(product => product.Category)
                      .WithMany(category => category.Products)
                      .HasForeignKey(product => product.CategoryId)
                      .IsRequired();

                // Indexing
                entity.HasIndex(props => new { props.Code, props.Name, props.Status });

                // Data Seeds
                entity.HasData(_stubProducts);
            });

            modelBuilder.Entity<Category>(entity =>
            {
                // Relationships
                entity.HasMany(category => category.Products)
                      .WithOne(product => product.Category)
                      .HasForeignKey(product => product.CategoryId)
                      .IsRequired();

                // Indexing
                entity.HasIndex(props => new { props.Name, props.Status });

                // Data Seeds
                entity.HasData(_stubCategories);
            });
        }
    }
}
