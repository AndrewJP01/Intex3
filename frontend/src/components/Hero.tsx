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

  const validMovies = featuredMovies.filter(
    (m) => m.imageUrl && !m.imageUrl.toLowerCase().includes("null")
  );

  console.log("Hero Featured Movies:", validMovies); // Debug

  if (validMovies.length === 0) return null;

  const handleMovieClick = (id?: string | number) => {
    if (id) navigate(`/${id}`);
  };

  return (
    <section className={styles.heroSection}>
      <HeroCarousel movies={validMovies} onMovieClick={handleMovieClick} />
    </section>
  );
};
