// src/pages/AdminPage.tsx
import React, { useState, useEffect } from 'react';
import {
  FaFilm,
  FaUser,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
  FaVideo,      // ✅ For "Type"
  FaTag // ✅ For "Rating"
} from 'react-icons/fa';
import './AdminPage.css';

type Movie = {
  show_id: string;
  title: string;
  genres: string; // changed to string since we're joining them
  type: string;            // 👈 Add this line
  rating: string;          // 👈 Add this line
  director: string;
  release_year: number;
  imageUrl: string;
};

const AdminPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5166/api/admin/movies')
      .then((res) => res.json())
      .then((data) => {
        const moviesWithImages = data.map((m: any) => ({
          show_id: m.show_id,
          title: m.title,
          genres: Array.isArray(m.genres)
            ? m.genres.join(', ')
            : 'Unknown',
          type: m.type || 'Unknown',         // 👈 New
          rating: m.rating || 'Unrated',     // 👈 New
          director: m.director || 'Unknown',
          release_year: m.release_year,
          imageUrl: `/posters/${encodeURIComponent(m.title)}.jpg`,
        }));
        setMovies(moviesWithImages);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch movies:', err);
        setLoading(false);
      });
  }, []);

  const handleEdit = (id: string) => {
    console.log(`Edit movie with id: ${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      setMovies((prev) => prev.filter((m) => m.show_id !== id));
    }
  };

  return (
    <div className="admin-background">
      <div className="admin-page-wrapper">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
        </header>

        <section className="admin-controls">
          <button className="btn primary">
            <FaPlus /> Add New
          </button>
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search Movies..." />
          </div>
          <button className="btn">Filter Movies</button>
        </section>

        <div className="movie-table-header">
            <span style={{ width: '90px' }}>Poster</span>
            <span style={{ marginLeft: '45px' }}>Title</span>
            <span>Genre</span>
            <span>Type</span>
            <span>Rating</span>
            <span>Director</span>
            <span>Year</span>
            <span>Actions</span>
        </div>


        {loading ? (
          <p>Loading movies...</p>
        ) : (
          <section className="movie-list">
            {movies.map((movie) => (
                <div key={movie.show_id} className="movie-row">
                    <img src={movie.imageUrl} alt={movie.title} />
                    <span>{movie.title}</span>
                    <span className="icon-text">
                        <FaFilm /> {movie.genres}
                    </span>
                    <span className="icon-text">
                    <FaVideo /> {movie.type}
                    </span>
                    <span className="icon-text">
                    <FaTag /> {movie.rating}
                    </span>

                    <span className="icon-text">
                        <FaUser /> {movie.director}
                    </span>
                    <span className="icon-text">
                        <FaCalendarAlt /> {movie.release_year}
                    </span>
                    <span className="actions">
                    <button className="btn edit" onClick={() => handleEdit(movie.show_id)}>
                        <FaEdit /> Edit
                    </button>
                    <button className="btn delete" onClick={() => handleDelete(movie.show_id)}>
                        <FaTrash /> Delete
                    </button>
                    </span>
                </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
