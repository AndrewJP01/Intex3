import React, { useState, useEffect, useRef } from 'react';
import styles from '../pages/MovieHomePage.module.css';
import { useNavigate } from 'react-router-dom';

type Movie = {
  title: string;
  category: string;
  imageUrl?: string;
  id?: string | number;
  description?: string;
  genre?: string;
  rating?: string;
  duration?: string;
  show_id?: string;
  releaseDate?: number;
};

type ContentCarouselProps = {
  title: string;
  movies: Movie[];
  delayRender?: number;
  onScrollEnd?: () => void;
};

export const ContentCarousel: React.FC<ContentCarouselProps> = ({
  title,
  movies,
  delayRender,
}) => {
  const navigate = useNavigate();
  const [validMovies, setValidMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredMovie, setHoveredMovie] = useState<Movie | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const imageCache = useRef<Map<string, boolean>>(new Map());
  const moviesPerPage = 6;

  const getMovieImageUrl = (movieTitle: string) => {
    return `https://localhost:7023/Movie%20Posters/${encodeURIComponent(movieTitle)}.jpg`;
  };

  const checkImage = async (url: string) => {
    if (imageCache.current.has(url)) {
      return imageCache.current.get(url);
    }

    try {
      const res = await fetch(url);
      const isValid = res.ok;
      imageCache.current.set(url, isValid);
      return isValid;
    } catch {
      imageCache.current.set(url, false);
      return false;
    }
  };

  useEffect(() => {
    const loadValidMovies = async () => {
      setLoading(true);
      const filtered: Movie[] = [];

      for (const movie of movies) {
        const url = movie.imageUrl || getMovieImageUrl(movie.title);
        const valid = await checkImage(url);
        filtered.push({
          ...movie,
          imageUrl: valid ? url : '/fallback.jpg',
        });
      }

      setValidMovies(filtered);
      setLoading(false);
    };

    const timeout = setTimeout(() => {
      loadValidMovies();
    }, delayRender || 0);

    return () => clearTimeout(timeout);
  }, [movies, delayRender]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setSelectedMovie(null);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMovie(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleMovieClick = (id: string | number | undefined) => {
    if (id) navigate(`/${id}`);
  };

  const handleNextClick = () => {
    const max = Math.ceil(validMovies.length / moviesPerPage) - 1;
    setCurrentIndex((prev) => Math.min(prev + 1, max));
  };

  const handlePrevClick = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className={styles.carouselSection}>
      <h2 className={styles.carouselTitle}>{title}</h2>

      {loading ? (
        <div className={styles.spinnerRow}></div>
      ) : (
        <div className={styles.carouselContainer}>
          <button
            className={styles.carouselPrev}
            onClick={handlePrevClick}
            disabled={currentIndex === 0}
            hidden={currentIndex === 0}
          >
            &#10094;
          </button>

          <div className={styles.carouselTrack}>
            {validMovies
              .slice(
                currentIndex * moviesPerPage,
                (currentIndex + 1) * moviesPerPage
              )
              .map((movie) => (
                <div
                  key={movie.title}
                  className={`${styles.carouselItem} ${selectedMovie?.title === movie.title ? styles.selected : ''}`}
                  onMouseEnter={() => setHoveredMovie(movie)}
                  onMouseLeave={() => setHoveredMovie(null)}
                  onClick={() => setSelectedMovie(movie)}
                >
                  <div className={styles.cardWrapper}>
                    <img
                      src={movie.imageUrl}
                      alt={movie.title}
                      className={styles.movieImage}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'fill',
                        borderRadius: '10px',
                      }}
                    />
                  </div>

                  {hoveredMovie?.title === movie.title && !selectedMovie && (
                    <div className={styles.hoverPopup}>
                      <div className={styles.hoverPopupContent}>
                        <h4 className={styles.hoverTitle}>{movie.title}</h4>
                        <p className={styles.meta}>
                          {movie.genre || 'Genre'} • {movie.rating || 'Rating'}{' '}
                          • {movie.duration || 'Length'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>

          <button
            className={styles.carouselNext}
            onClick={handleNextClick}
            disabled={
              currentIndex === Math.ceil(validMovies.length / moviesPerPage) - 1
            }
            hidden={currentIndex === Math.ceil(validMovies.length / moviesPerPage) - 1}
          >
            &#10095;
          </button>
        </div>
      )}

      {selectedMovie && (
        <div className={styles.centerPopup} ref={popupRef}>
          <div className={styles.popupContent}>
            <img
              src={selectedMovie.imageUrl}
              alt={selectedMovie.title}
              className={styles.popupImage}
              loading="lazy"
            />
            <div className={styles.popupDetails}>
              <h3>{selectedMovie.title}</h3>
              <p>{selectedMovie.description}</p>
              <p>
                {selectedMovie.releaseDate || 'TBD'} <br />
                {selectedMovie.genre || 'Genre'} •{' '}
                {selectedMovie.rating || 'Rating'} •{' '}
                {selectedMovie.duration || 'Length'}
              </p>
              <button
                className={styles.playButton}
                onClick={() => handleMovieClick(selectedMovie.show_id)}
              >
                ▶
              </button>
              <button
                className={styles.moreInfoButton}
                onClick={() => handleMovieClick(selectedMovie.show_id)}
              >
                More Info
              </button>
              <button
                className={styles.closeButton}
                onClick={() => setSelectedMovie(null)}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
      
    </section>
  );
};
