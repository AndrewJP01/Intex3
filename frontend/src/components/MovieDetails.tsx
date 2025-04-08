import React, { useEffect, useState } from 'react';

type MovieGenre = {
    name: string;
};

type MovieRating = {
    source: string;
    value: string;
};

type Movie = {
    show_id?: string;
    type?: string;
    title?: string;
    director?: string;
    cast?: string;
    country?: string;
    release_year?: number;
    rating?: string;
    duration?: string;
    description?: string;
    genres: MovieGenre[];
    ratings?: MovieRating[];
};

const MoviesPage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://localhost:5166/api/Admin/movies');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json() as Movie[];
                setMovies(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch movies. ' + (err as Error).message);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Movies</h1>
            {movies.map((movie) => (
                <div key={movie.show_id}>
                    <h2>{movie.title} ({movie.release_year})</h2>
                    <p><strong>Director:</strong> {movie.director || 'N/A'}</p>
                    <p><strong>Cast:</strong> {movie.cast || 'N/A'}</p>
                    <p><strong>Country:</strong> {movie.country || 'N/A'}</p>
                    <p><strong>Rating:</strong> {movie.rating}</p>
                    <p><strong>Duration:</strong> {movie.duration}</p>
                    <p><strong>Description:</strong> {movie.description}</p>
                    <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
                </div>
            ))}
        </div>
    );
};

export default MoviesPage;
