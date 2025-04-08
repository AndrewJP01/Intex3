import React, { useState, useEffect, useRef } from "react";
import styles from "../pages/MovieHomePage.module.css";
import { useNavigate } from "react-router-dom";

export type Movie = {
  title: string;
  category: string;
  imageUrl?: string;
  id?: string | number;
  description?: string | null; // Adjust based on actual data possibility
};

type ContentCarouselProps = {
  title: string;
  movies: Movie[];
};

export const ContentCarousel: React.FC<ContentCarouselProps> = ({ title, movies }) => {
  const navigate = useNavigate();
  const [validMovies, setValidMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const moviesPerPage = 7;
  const imageCache = useRef<Map<string, boolean>>(new Map());

  useEffect(() => {
    const loadValidMovies = async () => {
      const filteredMovies = [];
      for (const movie of movies) {
        const imageUrl = movie.imageUrl || getMovieImageUrl(movie.title);
        if (await checkImage(imageUrl)) {
          filteredMovies.push(movie);
        }
      }
      setValidMovies(filteredMovies);
    };

    loadValidMovies();
  }, [movies]);  // Dependency array ensures this only reruns when `movies` changes

  const handleMovieClick = (movieId: string | number | undefined) => {
    if (movieId) {
      navigate(`/movies/${movieId}`);
    }
  };

  const handleNextClick = () => {
    const maxIndex = Math.ceil(validMovies.length / moviesPerPage) - 1;
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, maxIndex));
  };

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const getMovieImageUrl = (movieTitle: string) => {
    return `http://localhost:5166/Movie%20Posters/${encodeURIComponent(movieTitle)}.jpg`;
  };

  const checkImage = async (url: string) => {
    if (imageCache.current.has(url)) {
      return imageCache.current.get(url);
    }

    try {
      const response = await fetch(url);
      const isValid = response.ok;
      imageCache.current.set(url, isValid);
      return isValid;
    } catch (error) {
      console.log("Error fetching image:", error);
      imageCache.current.set(url, false);
      return false;
    }
  };

  return (
    <section className={styles.carouselSection}>
      <h2 className={styles.carouselTitle}>{title}</h2>
      <div className={styles.carouselContainer}>
        <button className={styles.carouselPrev} onClick={handlePrevClick}>
          &#10094;
        </button>
        <div className={styles.carouselTrack}>
          {movies.map((movie) => (
            <div
              key={movie.title}
              className={styles.carouselItem}
              onClick={() => handleMovieClick(movie.id)}
            >
              <img
                src={movie.imageUrl || getMovieImageUrl(movie.title)}
                alt={movie.title}
                className={styles.movieImage}
              />
              <div className={styles.movieInfo}>
                <div className={styles.movieTitle}>{movie.title || "Untitled"}</div>
                <div className={styles.movieDescription}>{movie.description}</div>
              </div>
            </div>
          ))}
        </div>
        <button className={styles.carouselNext} onClick={handleNextClick}>
          &#10095;
        </button>
      </div>
    </section>
  );
}