"use client";
import React from "react";
import styles from "./Hero.module.css";
import HeroCarousel from "./HeroCarousel";
import { FeaturedMovie } from "../types/FeaturedMovie";
import { useNavigate } from "react-router-dom";

type HeroProps = {
  featuredMovies: FeaturedMovie[];
};

export const Hero: React.FC<HeroProps> = ({ featuredMovies }) => {
  const navigate = useNavigate();

  const handleMovieClick = (movieId: string | number | undefined) => {
    if (movieId) {
      navigate(`/${movieId}`);
    }
  };

  return (
    <section className={styles.heroSection}>
      <HeroCarousel movies={featuredMovies} onMovieClick={handleMovieClick} />
    </section>
  );
};
