'use client';
import React, { useEffect, useState } from 'react';
import styles from './MovieHomePage.module.css';

import { Hero } from '../components/Hero';
import { ContentCarousel } from '../components/ContentCarousel';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { Navbar } from '../components/Navbar';

import { useMovieData } from '../api/useMovieData';
import { useGenres } from '../api/useGenres';
import { useFeaturedMovies } from '../api/useFeaturedMovies';
import { MovieGroup, toFeatured, useOtherLists } from '../api/useOtherLists';

export const MoviesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);

  const {
    groupedByCategory,
    isLoading: moviesLoading,
    error: movieError,
  } = useMovieData(searchTerm, selectedCategories);

  const {
    genres: availableGenres,
    isLoading: genresLoading,
    error: genresError,
  } = useGenres();

  const {
    featuredMovies,
    personalizedMovies,
    loading: featuredLoading,
    error: featuredError,
  } = useFeaturedMovies();

  const {
    rewatchFavorites,
    topPicks,
    sinceYouLiked,
    genreRecommendations,
  } = useOtherLists();

  const sortedCategories = Object.entries(groupedByCategory).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  const regularGenreGroups: MovieGroup[] = sortedCategories.map(([category, movies]) => ({
    category,
    movies: movies.map((m) => toFeatured(m, category)),
  }));

  const shuffledRecommendations = [...genreRecommendations].sort(() => 0.5 - Math.random());
  const shuffledRegulars = [...regularGenreGroups].sort(() => 0.5 - Math.random());

  const mixedGenreRows: MovieGroup[] = [];
  const maxLen = Math.max(shuffledRecommendations.length, shuffledRegulars.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < shuffledRecommendations.length) mixedGenreRows.push(shuffledRecommendations[i]);
    if (i < shuffledRegulars.length) mixedGenreRows.push(shuffledRegulars[i]);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setVisibleCount((prev) => prev + 2);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLoading = moviesLoading || genresLoading || featuredLoading;
  const hasError = movieError || genresError || featuredError;

  return (
    <main className={styles.mainContainer}>
      <Navbar />

      {isLoading && (
        <>
          <p className={styles.loading}>Loading...</p>
          <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
          </div>
        </>
      )}

      {!isLoading && hasError && (
        <p className={styles.error}>Error loading data. Please try again later.</p>
      )}

      {!isLoading && !hasError && (
        <>
          {featuredMovies.length > 0 && <Hero featuredMovies={featuredMovies} />}

          <SearchBar searchTerm={searchTerm} onChange={setSearchTerm} />

          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            availableGenres={availableGenres}
          />

          {topPicks && (
            <ContentCarousel
              title={topPicks.category}
              movies={topPicks.movies}
              delayRender={100}
            />
          )}

          {rewatchFavorites && (
            <ContentCarousel
              title={rewatchFavorites.category}
              movies={rewatchFavorites.movies}
              delayRender={200}
            />
          )}

          {sinceYouLiked.map((group: MovieGroup, index) => (
                  <ContentCarousel
                    key={group.category}
                    title={group.category}
                    movies={group.movies}
                    delayRender={300 + index * 100}
                  />
                ))}

          {mixedGenreRows.slice(0, visibleCount).map((group, index) => (
            <ContentCarousel
              key={group.category}
              title={group.category}
              movies={group.movies}
              delayRender={index * 100}
            />
          ))}
        </>
      )}
    </main>
  );
};
