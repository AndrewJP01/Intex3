import React from "react";
import styles from "../pages/MovieHomePage.module.css";
import { useNavigate } from "react-router-dom";

type ContentCarouselProps = {
  title: string;
  movies: {
    title: string;
    category: string;
    id?: string | number; // optional for navigation
  }[];
};

export const ContentCarousel: React.FC<ContentCarouselProps> = ({ title, movies }) => {
  const navigate = useNavigate();

  const handleMovieClick = (movieId: string | number | undefined) => {
    if (movieId) {
      navigate(`/movies/${movieId}`);
    }
  };

  // Function to generate the image URL based on movie title
  const getMovieImageUrl = (movieTitle: string) => {
    // Replace spaces with hyphens and convert to lowercase if needed
    const imageName = movieTitle.replace(/\s+/g, '-').toLowerCase();
    return `http://yourdomain.com/images/${imageName}.jpeg`; // Adjust this URL if needed
  };

  return (
    <section className={styles.carouselSection}>
      <h2 className={styles.carouselTitle}>{title}</h2>
      <div className={styles.carouselContainer}>
        <div className={styles.carouselTrack}>
          {movies.map((movie) => (
            <div
              key={movie.title}
              className={styles.carouselItem}
              onClick={() => handleMovieClick(movie.id)}
            >
              {/* Dynamically generate the image URL */}
              <img
                src={getMovieImageUrl(movie.title)}
                alt={movie.title}
                className={styles.movieImage}
              />
              <div className={styles.movieTitle}>{movie.title || "Untitled"}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
