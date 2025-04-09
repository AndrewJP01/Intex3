import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MovieDetailPage.module.css';
import RecommendationsSection from '../components/RecommendationsSection';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://localhost:7023/api/Admin/${id}`);
        const response = await fetch(`https://localhost:7023/api/Admin/${id}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movie. ' + (err as Error).message);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const submitRating = async () => {
    if (!userRating || !id) return;

    // You could hardcode a test user_id or pull it from context/localStorage/auth
    const userId = 1; // Replace with actual user logic

    try {
      const res = await fetch(`https://localhost:7023/api/Admin/${id}/rate`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: userRating,
          user_id: userId,
        }),
      });

      if (res.ok) {
        alert(`Rating submitted: ${userRating} stars!`);
      } else {
        const errText = await res.text();
        throw new Error(errText);
      }
    } catch (err) {
      alert(`Error submitting rating: ${(err as Error).message}`);
    }
  };

  if (loading) {
    return (
      <div className={styles.fullscreenCenter}>
        <div className={styles.spinner}></div>
      </div>
    );
  }  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!movie) return null;

  const avgRating = movie.ratings?.[0] || 0;
  const ratingCount = movie.ratings?.[1] || 0;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <button
          className={styles.backButton}
          onClick={() => navigate('/MoviesPage')}
        >
          ✕
        </button>

        <div className={styles.heroSection}>
          <img
            className={styles.poster}
            src={`https://localhost:7023/Movie%20Posters/${encodeURIComponent(movie.title || '')}.jpg`}
            alt={movie.title}
          />

          <div className={styles.details}>
            <h1 className={styles.title}>{movie.title}</h1>
            <div className={styles.meta}>
              <span className={styles.tag}>{movie.release_year}</span>
              <span className={styles.tag}>{movie.rating}</span>
              <span className={styles.tag}>{movie.duration}</span>
            </div>

            <p className={styles.description}>{movie.description}</p>

            <div className={styles.buttons}>
              <button className={`${styles.button} ${styles.watch}`}>
                ▶ Watch Now
              </button>
              <button className={`${styles.button} ${styles.secondary}`}>
                + My Playlist
              </button>
            </div>

            <p>
              <strong>Genres:</strong> {movie.genres?.join(', ') || 'N/A'}
            </p>

            <div className={styles.ratingSection}>
              <p>
                <strong>Average Rating:</strong> {avgRating.toFixed(1)}{' '}
                {Array(Math.round(avgRating))
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} style={{ color: 'gold', fontSize: '1.1rem' }}>
                      ★
                    </span>
                  ))}{' '}
                ({ratingCount} {ratingCount === 1 ? 'user' : 'users'})
              </p>

              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={styles.star}
                    style={{
                      color:
                        (hoveredRating ?? userRating ?? 0) >= star
                          ? 'gold'
                          : '#555',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(null)}
                    onClick={() => setUserRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>

              {userRating && (
                <button
                  className={styles.submitRatingButton}
                  onClick={submitRating}
                >
                  Submit {userRating} Star Rating
                </button>
              )}
            </div>
                {movie.show_id && (
              <div className={styles.recommendationSection}>
                <RecommendationsSection showId={movie.show_id} title={movie.title} />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MovieDetailsPage;
