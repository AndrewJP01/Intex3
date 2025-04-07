"use client";
import React from "react";
import styles from "../pages/MovieHomePage.module.css";
import { useNavigate } from "react-router-dom";


type ContentCarouselProps = {
    title: string;
    movies: { title: string; category: string }[];
  };

  export const ContentCarousel: React.FC<ContentCarouselProps> = ({ title, movies }) => {
    const navigate = useNavigate();


    return (
      <section className={styles.carouselSection}>
        <h2 className={styles.carouselTitle}>{title}</h2>
        <div className={styles.carouselContainer}>
          <div className={styles.carouselTrack}>
            {movies.map((movie) => (
              <div key={movie.title} className={styles.carouselItem}>
                {movie.title}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  