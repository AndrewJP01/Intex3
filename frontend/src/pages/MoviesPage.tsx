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
import { useFeaturedMovies, MovieGroup, toFeatured } from '../api/useFeaturedMovies';


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

  const {
    featuredMovies,
    rewatchFavorites,
    topPicks,
    sinceYouLiked,
    genreRecommendations,
    loading: featuredLoading,
    error: featuredError,
  } = useFeaturedMovies();

  const sortedCategories = Object.entries(groupedByCategory).sort((a, b) => a[0].localeCompare(b[0]));

  // Convert regular categories to MovieGroup[]
const regularGenreGroups: MovieGroup[] = sortedCategories.map(([category, movies]) => ({
  category,
  movies: movies.map((m) => toFeatured(m, category)),
}));

// Shuffle both genre recs and regular genres separately
const shuffledRecommendations = [...genreRecommendations].sort(() => 0.5 - Math.random());
const shuffledRegulars = [...regularGenreGroups].sort(() => 0.5 - Math.random());

// Interleave them so no two genreRecommendations appear back-to-back
const mixedGenreRows: MovieGroup[] = [];
const maxLen = Math.max(shuffledRecommendations.length, shuffledRegulars.length);

for (let i = 0; i < maxLen; i++) {
  if (i < shuffledRecommendations.length) mixedGenreRows.push(shuffledRecommendations[i]);
  if (i < shuffledRegulars.length) mixedGenreRows.push(shuffledRegulars[i]);
}


  return (
    <main className={styles.mainContainer}>
      <Navbar />

      {/* 🎬 Featured Hero Banner */}
      {!featuredLoading && !featuredError && featuredMovies.length > 0 && (
        <Hero featuredMovies={featuredMovies} />
      )}

      <SearchBar searchTerm={searchTerm} onChange={setSearchTerm} />

      <CategoryFilter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        availableGenres={availableGenres}
      />

      {/* 🎯 Top Picks for You */}
      {topPicks && (
        <ContentCarousel
          title={topPicks.category}
          movies={topPicks.movies}
          delayRender={100}
        />
      )}

      {/* 🔁 Rewatch Favorites */}
      {rewatchFavorites && (
        <ContentCarousel
          title={rewatchFavorites.category}
          movies={rewatchFavorites.movies}
          delayRender={200}
        />
      )}

      {/* ❤️ Since you liked... (up to 3) */}
      {sinceYouLiked.map((group: MovieGroup, index) => (
        <ContentCarousel
          key={group.category}
          title={group.category}
          movies={group.movies}
          delayRender={300 + index * 100}
        />
      ))}

      {/* 🎭 Shuffled Genre-Based + Regular Genre Carousels */}
      {mixedGenreRows.map((group: MovieGroup, index) => (
        <ContentCarousel
          key={group.category}
          title={group.category}
          movies={group.movies}
          delayRender={0 + index * 100}
        />
      ))}
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