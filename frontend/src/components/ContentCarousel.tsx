"use client";
import React from "react";
import styles from "../pages/MovieHomePage.module.css";
import { useNavigate } from "react-router-dom";

type ContentCarouselProps = {
  title: string;
  movies: {
    title: string;
    category: string;
    imageUrl?: string; // optional
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
              {movie.imageUrl ? (
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className={styles.movieImage}
                />
              ) : (
                <div className={styles.placeholderImage}>No Image</div>
              )}
              <div className={styles.movieTitle}>{movie.title || "Untitled"}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
