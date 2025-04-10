using Microsoft.EntityFrameworkCore;
using Intex2.API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Intex2.API.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<MovieGenre> MovieGenres { get; set; }
        public DbSet<MovieUser> MovieUsers { get; set; }
        public DbSet<MovieRating> MovieRatings { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Movies
            modelBuilder.Entity<Movie>(entity =>
            {
                entity.ToTable("movies_titles");
                entity.HasKey(m => m.show_id);

                entity.Property(m => m.show_id).HasColumnName("show_id");
                entity.Property(m => m.type).HasColumnName("type");
                entity.Property(m => m.title).HasColumnName("title");
                entity.Property(m => m.director).HasColumnName("director");
                entity.Property(m => m.cast).HasColumnName("cast");
                entity.Property(m => m.country).HasColumnName("country");
                entity.Property(m => m.release_year).HasColumnName("release_year");
                entity.Property(m => m.rating).HasColumnName("rating");
                entity.Property(m => m.duration).HasColumnName("duration");
                entity.Property(m => m.description).HasColumnName("description");
            });

            // MovieGenres
            modelBuilder.Entity<MovieGenre>(entity =>
            {
                entity.ToTable("movie_genres");
                entity.HasKey(g => new { g.show_id, g.genre });

                entity.Property(g => g.show_id).HasColumnName("show_id");
                entity.Property(g => g.genre).HasColumnName("genre");

                entity.HasOne(g => g.movie)
                      .WithMany(m => m.genres)
                      .HasForeignKey(g => g.show_id);
            });

            // MovieUsers
            modelBuilder.Entity<MovieUser>(entity =>
            {
                entity.ToTable("movies_users");
                entity.HasKey(u => u.user_id);

                entity.Property(u => u.user_id).HasColumnName("user_id");
                entity.Property(u => u.name).HasColumnName("name");
                entity.Property(u => u.phone).HasColumnName("phone");
                entity.Property(u => u.email).HasColumnName("email");
                entity.Property(u => u.age).HasColumnName("age");
                entity.Property(u => u.gender).HasColumnName("gender");
                entity.Property(u => u.city).HasColumnName("city");
                entity.Property(u => u.state).HasColumnName("state");
                entity.Property(u => u.zip).HasColumnName("zip");

                entity.Property(u => u.Netflix).HasColumnName("Netflix");
                entity.Property(u => u.Amazon_Prime).HasColumnName("Amazon Prime");
                entity.Property(u => u.DisneyPlus).HasColumnName("Disney+");
                entity.Property(u => u.ParamountPlus).HasColumnName("Paramount+");
                entity.Property(u => u.Max).HasColumnName("Max");
                entity.Property(u => u.Hulu).HasColumnName("Hulu");
                entity.Property(u => u.AppleTVPlus).HasColumnName("Apple TV+");
                entity.Property(u => u.Peacock).HasColumnName("Peacock");
            });

            // MovieRatings
            modelBuilder.Entity<MovieRating>(entity =>
            {
                entity.ToTable("movies_ratings");
                entity.HasKey(r => new { r.user_id, r.show_id });

                entity.Property(r => r.user_id).HasColumnName("user_id");
                entity.Property(r => r.show_id).HasColumnName("show_id");
                entity.Property(r => r.rating).HasColumnName("rating");

                entity.HasOne(r => r.user)
                      .WithMany(u => u.ratings)
                      .HasForeignKey(r => r.user_id);

                entity.HasOne(r => r.movie)
                      .WithMany(m => m.ratings)
                      .HasForeignKey(r => r.show_id);
            });
        }
    }
}

