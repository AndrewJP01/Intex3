import React, { useState, useEffect } from "react";
import styles from "../pages/MovieHomePage.module.css";
import { useNavigate } from "react-router-dom";

type Movie = {
  title: string;
  category: string;
  imageUrl?: string;
  id?: string | number;
};

type ContentCarouselProps = {
  title: string;
  movies: {
    title: string;
    category: string;
    imageUrl?: string;
    id?: string | number;
  }[];
};

export const ContentCarousel: React.FC<ContentCarouselProps> = ({ title, movies }) => {
  const navigate = useNavigate();
  const [validMovies, setValidMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const moviesPerPage = 7;

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
  }, [movies]);

  const handleMovieClick = (movieId: string | number | undefined) => {
    if (movieId) {
      navigate(`/movies/${movieId}`);
    }
  };

  const handleNextClick = () => {
    const maxIndex = Math.ceil(validMovies.length / moviesPerPage) - 1;
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex <= maxIndex ? nextIndex : prevIndex;
    });
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex >= 0 ? nextIndex : prevIndex;
    });
  };

  // Only show the movies for the current page
  const visibleMovies = validMovies.slice(currentIndex * moviesPerPage, (currentIndex + 1) * moviesPerPage);

  const getMovieImageUrl = (movieTitle: string) => {
    const formattedTitle = encodeURIComponent(movieTitle);
    return `http://localhost:5166/Movie%20Posters/${formattedTitle}.jpg`;
  };

  const checkImage = async (url: RequestInfo | URL) => {
    try {
      const response = await fetch(url);
      return response.ok;
    } catch (error) {
      console.log("Error fetching image:", error);
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
          {visibleMovies.map((movie) => (
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
              <div className={styles.movieTitle}>{movie.title || "Untitled"}</div>
            </div>
          ))}
        </div>
        <button className={styles.carouselNext} onClick={handleNextClick}>
          &#10095;
        </button>
      </div>
    </section>
  );
};
