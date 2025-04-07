import React, { useEffect, useState } from 'react';

interface Movie {
  show_id: string;
  title: string;
  type: string;
  director: string;
  cast: string;
  country: string;
  release_year: number;
  rating: string;
  duration: string;
  description: string;
  genres: string[];
}

const AdminMovieManager: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState<Movie>({
    show_id: '',
    title: '',
    type: 'Movie',
    director: '',
    cast: '',
    country: '',
    release_year: 2025,
    rating: '',
    duration: '',
    description: '',
    genres: []
  });

  const baseUrl = 'https://localhost:7023/api/Admin/movies'; // Change to Azure when needed

  useEffect(() => {
    fetch(baseUrl)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error('Failed to load movies', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMovie(prev => ({ ...prev, [name]: name === 'release_year' ? parseInt(value) : value }));
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMovie(prev => ({ ...prev, genres: e.target.value.split(',').map(g => g.trim()) }));
  };

  const handleCreate = () => {
    fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMovie),
    })
      .then(res => res.json())
      .then(() => window.location.reload())
      .catch(err => console.error('Failed to create movie', err));
  };

  const handleDelete = (id: string) => {
    fetch(`${baseUrl}/${id}`, { method: 'DELETE' })
      .then(() => window.location.reload())
      .catch(err => console.error('Failed to delete movie', err));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Movie Manager</h2>

      <div style={{ marginBottom: '2rem' }}>
        <h4>Create New Movie</h4>
        {Object.keys(newMovie).map((key) =>
          key !== 'genres' ? (
            <input
              key={key}
              placeholder={key}
              name={key}
              value={(newMovie as any)[key]}
              onChange={handleChange}
              style={{ display: 'block', marginBottom: '0.5rem' }}
            />
          ) : (
            <input
              key={key}
              placeholder="Genres (comma separated)"
              onChange={handleGenreChange}
              style={{ display: 'block', marginBottom: '0.5rem' }}
            />
          )
        )}
        <button onClick={handleCreate}>Add Movie</button>
      </div>

      <h4>Movie List</h4>
      {movies.length > 0 ? (
        <ul>
          {movies.map(movie => (
            <li key={movie.show_id}>
              <b>{movie.title}</b> ({movie.release_year})
              <button style={{ marginLeft: '1rem' }} onClick={() => handleDelete(movie.show_id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
};

export default AdminMovieManager;