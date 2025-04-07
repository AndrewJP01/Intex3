using Microsoft.EntityFrameworkCore;
using Intex2.API.Models;

namespace Intex2.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<MovieGenre> MovieGenres { get; set; }
        public DbSet<MovieUser> MovieUsers { get; set; }
        public DbSet<MovieRating> MovieRatings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Map Movie entity to movies_titles and match column names
            modelBuilder.Entity<Movie>(entity =>
            {
                entity.ToTable("movies_titles");
                entity.HasKey(m => m.ShowId);

                entity.Property(m => m.ShowId).HasColumnName("show_id");
                entity.Property(m => m.Title).HasColumnName("title");
                entity.Property(m => m.Type).HasColumnName("type");
                entity.Property(m => m.Director).HasColumnName("director");
                entity.Property(m => m.Cast).HasColumnName("cast");
                entity.Property(m => m.Country).HasColumnName("country");
                entity.Property(m => m.ReleaseYear).HasColumnName("release_year");
                entity.Property(m => m.Rating).HasColumnName("rating");
                entity.Property(m => m.Duration).HasColumnName("duration");
                entity.Property(m => m.Description).HasColumnName("description");
            });

            // MovieGenres relationship
            modelBuilder.Entity<MovieGenre>()
                .HasOne(mg => mg.Movie)
                .WithMany(m => m.Genres)
                .HasForeignKey(mg => mg.ShowId);

            // MovieRatings relationship
            modelBuilder.Entity<MovieRating>()
                .HasKey(r => new { r.UserId, r.ShowId });

            modelBuilder.Entity<MovieRating>()
                .HasOne(r => r.User)
                .WithMany(u => u.Ratings)
                .HasForeignKey(r => r.UserId);

            modelBuilder.Entity<MovieRating>()
                .HasOne(r => r.Movie)
                .WithMany(m => m.Ratings)
                .HasForeignKey(r => r.ShowId);
        }
    }
}

