import React, { useState, useEffect, useRef } from 'react';
import styles from '../pages/MovieHomePage.module.css';
import { useNavigate } from 'react-router-dom';
import { FeaturedMovie } from '../types/FeaturedMovie';


export type Movie = {
  title: string;
  genre: string;  // Single source of truth
  imageUrl?: string;
  id?: string | number;
  description?: string;
  rating: string;
  duration: string;
  releaseDate: number;
  show_id?: string;
};




type ContentCarouselProps = {
  title: string;
  movies: FeaturedMovie[];
  delayRender?: number;
  onScrollEnd?: () => void;
};

export const ContentCarousel: React.FC<ContentCarouselProps> = ({
  title,
  movies,
  delayRender,
}) => {
  const navigate = useNavigate();
  const [validMovies, setValidMovies] = useState<FeaturedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredMovie, setHoveredMovie] = useState<FeaturedMovie | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<FeaturedMovie | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [moviesPerPage, setMoviesPerPage] = useState(6);

  const getMovieImageUrl = (show_Id: string) => {
    return `https://posterstorage13.blob.core.windows.net/posters/renamed_posters/${show_Id}.jpg`;
  };

  console.log(hoveredMovie)
  console.log
  useEffect(() => {
    const loadValidMovies = async () => {
      setLoading(true);
      const filtered = movies.map((movie) => ({
        ...movie,
        genre: movie.genre,
        rating: movie.rating,
        duration: movie.duration,
        releaseDate: movie.releaseDate,
        show_id: movie.show_id,
        imageUrl: getMovieImageUrl(movie.show_id || ''),
      }));
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
  

  const getShortTitle = (title: string, wordLimit: number = 3) => {
    const words = title.split(' ');
    if (words.length <= wordLimit) return title;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 2000) {
        setMoviesPerPage(6);
      } else if (window.innerWidth > 600) {
        setMoviesPerPage(6);
      } else if (window.innerWidth > 600) {
        setMoviesPerPage(4);
      } else {
        setMoviesPerPage(2);
      }
    };
  
    window.addEventListener('resize', handleResize);
    handleResize(); // initial run
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  

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
            <div className={styles.spinnerContainer}>
            <div className={styles.spinnerRow}></div>
          </div>
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

          <div className={styles.carouselTrack}
          >
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
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/fallback.jpg';
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'fill',
                        borderRadius: '10px',
                      }}
                    />
                  <div className={styles.hoverOverlay}>
                      <h4 className={styles.hoverTitle}>{getShortTitle(movie.title)}</h4>

                  </div>
                  </div>
                 
                </div>
              ))}
          </div>

          <button
            className={styles.carouselNext}
            onClick={handleNextClick}
            disabled={
              currentIndex === Math.ceil(validMovies.length / moviesPerPage) - 1
            }
            hidden={
              currentIndex === Math.ceil(validMovies.length / moviesPerPage) - 1
            }
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
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/fallback.jpg';
            }}
          />

            <div className={styles.popupDetails}>
              <h3>{selectedMovie.title}</h3>
              <p>{selectedMovie.description}</p>
              <p>
                {selectedMovie.releaseDate} <br />       
              </p>
              <p>
              {selectedMovie.genre}
              </p>
                <p>{selectedMovie.rating || 'Rating'} •{' '}</p>
                
                <p>{selectedMovie.duration || 'Length'}</p>
       

              <button
                className={styles.playButton}
                onClick={() => handleMovieClick(selectedMovie.show_id)}
              >
                ▶
              </button>
              <button
                  className={styles.moreInfoButton}
                  onClick={() => {
                    setSelectedMovie(null);
                    handleMovieClick(selectedMovie.show_id);
                  }}
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