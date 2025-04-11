import React, { useState, useEffect } from "react";
import styles from "./HeroCarousel.module.css";
import { FeaturedMovie } from "../types/FeaturedMovie";

type Props = {
  movies: FeaturedMovie[];
  onMovieClick?: (id: string | number | undefined) => void;
};

const HeroCarousel: React.FC<Props> = ({ movies, onMovieClick }) => {
  const filteredMovies = movies.filter(
    (movie) =>
      movie.imageUrl &&
      !movie.imageUrl.toLowerCase().includes("null") &&
      movie.imageUrl.trim() !== ""
  );

  const [index, setIndex] = useState(0);
  const [bgImage, setBgImage] = useState<string>("");

  const FallbackImage = "/fallback.jpg"; // Must be in /public

  useEffect(() => {
    if (filteredMovies.length === 0) return;
  
    const imageToLoad = filteredMovies[index]?.imageUrl || FallbackImage;
  
    const img = new Image();
    img.src = imageToLoad;
  
    img.onload = () => {
      setBgImage(imageToLoad || FallbackImage);
    };
  
    img.onerror = () => {
      console.log("Failed to load image → Using fallback");
      setBgImage(FallbackImage);
    };
  }, [index, filteredMovies]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % filteredMovies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [filteredMovies.length]);

  if (filteredMovies.length === 0) return null;

  const currentMovie = filteredMovies[index];

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % filteredMovies.length);
  };

  const goToPrev = () => {
    setIndex((prev) => (prev - 1 + filteredMovies.length) % filteredMovies.length);
  };

  return (
    <div className={styles.heroCarousel}>
      <div className={styles.heroSlide}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>{currentMovie.title}</h1>
          <p className={styles.description}>{currentMovie.description}</p>
          <div className={styles.buttons}>
            <button
              className={styles.watchButton}
              onClick={() => onMovieClick?.(currentMovie.show_id)}
            >
              ▶ Watch Now
            </button>
            <button
              className={styles.detailsButton}
              onClick={() => onMovieClick?.(currentMovie.show_id)}
            >
              Details
            </button>
          </div>
        </div>

        <div
          className={styles.imageContainer}
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        />

        <button className={styles.navLeft} onClick={goToPrev}>
          &#10094;
        </button>
        <button className={styles.navRight} onClick={goToNext}>
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