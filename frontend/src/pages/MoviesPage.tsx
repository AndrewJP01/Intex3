'use client';
import React, { useState } from 'react';
import styles from './MovieHomePage.module.css';
import { Hero } from '../components/Hero';
import { ContentCarousel } from '../components/ContentCarousel';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { useMovieData } from '../api/useMovieData';
import { Navbar } from '../components/Navbar';
import { useGenres } from '../api/useGenres';
import { useFeaturedMovies } from '../api/useFeaturedMovies';
import { FeaturedMovie } from '../types/FeaturedMovie';

export const MoviesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const {
    groupedByCategory,
    isLoading: moviesLoading,
    error: movieError,
    loadMoreByGenre  // 👈 ADD THIS
  } = useMovieData(searchTerm, selectedCategories);

  const {
    genres: availableGenres,
    isLoading: genresLoading,
    error: genresError,
  } = useGenres();

  // ✅ Correctly use the hook here (no redeclaration!)
  const {
    featuredMovies,
    personalizedMovies,
    loading: featuredLoading,
    error: featuredError,
  } = useFeaturedMovies();

  // Sort the categories alphabetically or by any other logic
  const sortedCategories = Object.entries(groupedByCategory).sort((a, b) => {
    return a[0].localeCompare(b[0]); // sorts categories alphabetically, you can change this logic if needed
  });

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

      {personalizedMovies.length > 0 && (
                <ContentCarousel
                  title="Since you liked..."
                  movies={personalizedMovies}
                  delayRender={0}
                />
              )}


      {moviesLoading || genresLoading ? (
        <>
          <p className={styles.loading}>Loading...</p>
          <div className={styles.spinnerContainer}>

          <p className={styles.spinner}></p>
          </div>
        </>
      ) : movieError || genresError ? (
        <p className={styles.error}>
          Error loading data. Please try again later.
        </p>
      ) : (
        sortedCategories.map(([genre, movies]) => (
          <ContentCarousel
            key={genre}
            title={genre}
            movies={movies}
          />
        ))
      )}
    </main>
  );
};
