import React, { useState, useEffect } from "react";
import styles from "./HeroCarousel.module.css";
import { FeaturedMovie } from "../types/FeaturedMovie";


type Props = {
  movies: FeaturedMovie[];
  onMovieClick?: (id: string | number | undefined) => void;

};

const HeroCarousel: React.FC<Props> = ({ movies, onMovieClick }) => {
  // Filter out movies with missing or bad images
  const filteredMovies = movies.filter(
    (movie) =>
      movie.imageUrl &&
      !movie.imageUrl.toLowerCase().includes("null") &&
      movie.imageUrl.trim() !== ""
  );

  const [index, setIndex] = useState(0);

  // Auto-slide every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % filteredMovies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [filteredMovies.length]);

  if (filteredMovies.length === 0) return null;

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % filteredMovies.length);
  };

  const goToPrev = () => {
    setIndex((prev) => (prev - 1 + filteredMovies.length) % filteredMovies.length);
  };

  return (
    <div className={styles.heroCarousel}>
      <div
        className={styles.heroSlide}
        style={{ backgroundImage: `url(${filteredMovies[index].imageUrl})` }}
      >
        <button className={styles.navLeft} onClick={() => setIndex((index - 1 + movies.length) % movies.length)}>
        &#10094;
        </button>
        <div className={styles.overlay}>
          <h1 className={styles.title}>{filteredMovies[index].title}</h1>
          <p className={styles.description}>{filteredMovies[index].description}</p>
          <div className={styles.buttons}>
          <button
                className={styles.watchButton}
                onClick={() => onMovieClick?.(filteredMovies[index].show_id)}
            >
                ▶ Watch Now
            </button>
            <button
                    className={styles.detailsButton}
                    onClick={() => onMovieClick?.(filteredMovies[index].show_id)}
                >
                    Details
                </button>
            </div>
        </div>
        <button className={styles.navRight} onClick={() => setIndex((index + 1) % movies.length)}>
                &#10095;
                </button>
      </div>

      <div className={styles.dots}>
        {filteredMovies.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === index ? styles.active : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
