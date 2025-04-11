// src/api/useFeaturedMovies.ts
import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { FeaturedMovie } from '../types/FeaturedMovie';
import { useUser } from '../context/UserContext';

export type MovieGroup = {
  category: string;
  movies: FeaturedMovie[];
};

const buildImageUrl = (showId: string | undefined): string => {
  if (!showId) return '/fallback.jpg';
  return `https://posterstorage13.blob.core.windows.net/posters/renamed_posters/${encodeURIComponent(showId)}.jpg`;
};

export const toFeatured = (movie: any, category?: string): FeaturedMovie => {
  const genreString = Array.isArray(movie.genres)
    ? movie.genres.map((g: any) => (typeof g === 'string' ? g : g.genre)).join(', ')
    : movie.genre || '';

  return {
    show_id: movie.show_id ?? '',
    title: movie.title,
    description: movie.description,
    imageUrl: buildImageUrl(movie.show_id),
    genre: genreString,
    rating: movie.rating,
    duration: movie.duration,
    category,
    releaseDate: movie.releaseDate,
  };
};

export const useOtherLists = () => {
  const [rewatchFavorites, setRewatchFavorites] = useState<MovieGroup | null>(null);
  const [topPicks, setTopPicks] = useState<MovieGroup | null>(null);
  const [sinceYouLiked, setSinceYouLiked] = useState<MovieGroup[]>([]);
  const [genreRecommendations, setGenreRecommendations] = useState<MovieGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userId } = useUser();

  useEffect(() => {
    console.log(':fire: useOtherLists Mounted | userId:', userId);
    const fetchPersonalized = async () => {
      try {
        if (!userId) {
          console.warn(':warning: No userId found. Skipping fetch.');
          return;
        }

        const api = 'https://intex2-backend-ezarg.azurewebsites.net/api';

        // Rewatch Favorites
        const rewatchRes = await fetch(`${api}/recommendations/category/${userId}/rewatch_favorite`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const rewatchData = await rewatchRes.json();
        setRewatchFavorites({
          category: 'Rewatch Favorites',
          movies: rewatchData.map((m: Movie) => toFeatured(m)),
        });

        // Top Picks
        const topPickRes = await fetch(`${api}/recommendations/category/${userId}/top_picks`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const topPicksData = await topPickRes.json();
        setTopPicks({
          category: 'Top Picks for You',
          movies: topPicksData.map((m: Movie) => toFeatured(m)),
        });

        // Since You Liked
        const topRated = await fetch(`${api}/recommendations/topRated/${userId}`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const sinceYouLikedData = await topRated.json();
        const similarGroups: MovieGroup[] = sinceYouLikedData.map((group: any) => ({
          category: group.category,
          movies: group.movies.map((m: Movie) => toFeatured(m)),
        }));
        setSinceYouLiked(similarGroups);

        // Genre Recommendations
        const genreRes = await fetch(`${api}/recommendations/category/${userId}/genre_recommendation`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
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
        console.log(':white_check_mark: All personalized lists loaded successfully.');
      } catch (err) {
        console.error(':x: Error fetching personalized lists:', err);
        setError('Failed to load personalized recommendations.');
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalized();
  }, [userId]);

  return {
    rewatchFavorites,
    topPicks,
    sinceYouLiked,
    genreRecommendations,
    loading,
    error,
  };
};
