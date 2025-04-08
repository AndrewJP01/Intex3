"use client";
import React, { useState } from "react";
import styles from "./MovieHomePage.module.css";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ContentCarousel } from "../components/ContentCarousel";
import { SearchBar } from "../components/SearchBar";
import { CategoryFilter } from "../components/CategoryFilter";
import { useMovieData } from "../api/useMovieData";
import { NavBar } from "../components/NavBar";
import { useGenres } from "../api/useGenres";

export const MoviesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  

  const {
    groupedByCategory,
    isLoading: moviesLoading,
    error: movieError
  } = useMovieData(searchTerm, selectedCategories);

  const {
    genres: availableGenres,
    isLoading: genresLoading,
    error: genresError
  } = useGenres();

  return (
    <main className={styles.mainContainer}>
      <NavBar />
      <Hero
        featuredMovie={{
          title: "Midnight Mass",
          description: "A chilling, slow-burn mystery from Mike Flanagan...",
          imageUrl: "/image.png"
        }}
      />
      <SearchBar searchTerm={searchTerm} onChange={setSearchTerm} />
      <CategoryFilter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        availableGenres={availableGenres}
      />


      {moviesLoading || genresLoading ? (
        <p className={styles.loading}>Loading movies...</p>
      ) : movieError || genresError ? (
        <p className={styles.error}>Error loading data. Please try again later.</p>
      ) : (
        Object.entries(groupedByCategory).map(([category, movies]) => (
          movies.length > 0 && (
            <ContentCarousel key={category} title={category} movies={movies} />
          )
        ))
      )}
    </main>
  );
};
