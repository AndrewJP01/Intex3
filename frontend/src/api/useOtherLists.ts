// src/api/useOtherLists.ts
import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { FeaturedMovie } from '../types/FeaturedMovie';

export type MovieGroup = {
  category: string;
  movies: FeaturedMovie[];
};

const buildImageUrl = (title: string): string => {
  return `${import.meta.env.VITE_API_URL}/Movie%20Posters/${encodeURIComponent(title)}.jpg`;
};

export const toFeatured = (movie: any, category?: string): FeaturedMovie => {
  const genreString = Array.isArray(movie.genres)
    ? movie.genres
        .map((g: any) => (typeof g === 'string' ? g : g.genre))
        .join(', ')
    : movie.genre || '';

  return {
    show_id: movie.show_id ?? '',
    title: movie.title,
    description: movie.description,
    imageUrl: buildImageUrl(movie.title),
    genre: genreString,
    rating: movie.rating,
    duration: movie.duration,
    category,
    releaseDate: movie.releaseDate,
  };
};

export const useOtherLists = () => {
  const [rewatchFavorites, setRewatchFavorites] = useState<MovieGroup | null>(
    null
  );
  const [topPicks, setTopPicks] = useState<MovieGroup | null>(null);
  const [sinceYouLiked, setSinceYouLiked] = useState<MovieGroup[]>([]);
  const [genreRecommendations, setGenreRecommendations] = useState<
    MovieGroup[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = 11; // 🔒 TEMP: Replace with dynamic ID later

  useEffect(() => {
    const fetchPersonalized = async () => {
      try {
        const base = import.meta.env.VITE_API_URL;

        const rewatchRes = await fetch(
          `${base}/api/recommendations/category/${userId}/rewatch_favorite`,
          {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const rewatchData = await rewatchRes.json();
        setRewatchFavorites({
          category: 'Rewatch Favorites',
          movies: rewatchData.map((m: Movie) => toFeatured(m)),
        });

        const topPickRes = await fetch(
          `${base}/api/recommendations/category/${userId}/top_picks`,
          {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const topPicksData = await topPickRes.json();
        setTopPicks({
          category: 'Top Picks for You',
          movies: topPicksData.map((m: Movie) => toFeatured(m)),
        });

        const topRated = await fetch(
          `${base}/api/recommendations/topRated/${userId}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const sinceYouLikedData = await topRated.json();
        const similarGroups: MovieGroup[] = sinceYouLikedData.map(
          (group: any) => ({
            category: group.category,
            movies: group.movies.map((m: Movie) => toFeatured(m)),
          })
        );
        setSinceYouLiked(similarGroups);

        const genreRes = await fetch(
          `${base}/api/recommendations/category/${userId}/genre_recommendation`,
          {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const genreData = await genreRes.json();

        const genreGroups: Record<string, Movie[]> = {};
        for (const m of genreData) {
          const genre = m.genre || 'Other';
          if (!genreGroups[genre]) genreGroups[genre] = [];
          genreGroups[genre].push(m);
        }

        const entries = Object.entries(genreGroups)
          .sort(() => 0.5 - Math.random())
          .slice(0, 10)
          .map(([genre, movies]) => ({
            category: `${genre} Recommendations For You`,
            movies: movies.map((m: Movie) => toFeatured(m, genre)),
          }));

        setGenreRecommendations(entries);
      } catch (err) {
        setError('Failed to load personalized recommendations.');
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalized();
  }, []);

  return {
    rewatchFavorites,
    topPicks,
    sinceYouLiked,
    genreRecommendations,
    loading,
    error,
  };
};
