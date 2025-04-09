"use client";
import React, { useState } from "react";
import styles from "./MovieHomePage.module.css";
import { Hero } from "../components/Hero";
import { ContentCarousel } from "../components/ContentCarousel";
import { SearchBar } from "../components/SearchBar";
import { CategoryFilter } from "../components/CategoryFilter";
import { useMovieData } from "../api/useMovieData";
import { Navbar } from "../components/Navbar";
import { useGenres } from "../api/useGenres";
import { useFeaturedMovies } from "../api/useFeaturedMovies";
import { FeaturedMovie } from "../types/FeaturedMovie";

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

  // ✅ Correctly use the hook here (no redeclaration!)
  const {
    featuredMovies,
    loading: featuredLoading,
    error: featuredError
  } = useFeaturedMovies();

  return (
    <main className={styles.mainContainer}>
      <Navbar />

      {!featuredLoading && !featuredError && featuredMovies.length > 0 && (
        <Hero featuredMovies={featuredMovies} />
      )}

      <SearchBar searchTerm={searchTerm} onChange={setSearchTerm} />

      <CategoryFilter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        availableGenres={availableGenres}
      />

      {moviesLoading || genresLoading ? (
        <>
          <p className={styles.loading}>Loading...</p>
          <p className={styles.spinner}></p>
        </>
      ) : movieError || genresError ? (
        <p className={styles.error}>Error loading data. Please try again later.</p>
      ) : (
        Object.entries(groupedByCategory).map(([category, movies], index) => (
          <ContentCarousel
            key={category}
            title={category}
            movies={movies}
            delayRender={index * 100} // pass delay based on order
          />
        ))
      )}
    </main>
  );
};
