// src/pages/AdminPage.tsx
import React, { useState } from 'react';
import {
  FaFilm,
  FaUser,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
} from 'react-icons/fa';
import './AdminPage.css';

type Movie = {
  id: number;
  title: string;
  genre: string;
  director: string;
  year: number;
  imageUrl: string;
};

const sampleMovies: Movie[] = [
  {
    id: 1,
    title: 'The Indie Hit',
    genre: 'Drama',
    director: 'Jane Doe',
    year: 2021,
    imageUrl: 'https://via.placeholder.com/100x150',
  },
  {
    id: 2,
    title: 'Cult Classic',
    genre: 'Horror',
    director: 'John Smith',
    year: 1987,
    imageUrl: 'https://via.placeholder.com/100x150',
  },
];

const AdminPage = () => {
  const [movies, setMovies] = useState(sampleMovies);

  const handleEdit = (id: number) => {
    console.log(`Edit movie with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      setMovies((prev) => prev.filter((m) => m.id !== id));
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
          <span>Poster</span>
          <span>Title</span>
          <span>Genre</span>
          <span>Director</span>
          <span>Year</span>
          <span>Actions</span>
        </div>

        <section className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-row">
              <img src={movie.imageUrl} alt={movie.title} />
              <span>{movie.title}</span>
              <span className="icon-text">
                <FaFilm /> {movie.genre}
              </span>
              <span className="icon-text">
                <FaUser /> {movie.director}
              </span>
              <span className="icon-text">
                <FaCalendarAlt /> {movie.year}
              </span>
              <span className="actions">
                <button className="btn edit" onClick={() => handleEdit(movie.id)}>
                  <FaEdit /> Edit
                </button>
                <button className="btn delete" onClick={() => handleDelete(movie.id)}>
                  <FaTrash /> Delete
                </button>
              </span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
