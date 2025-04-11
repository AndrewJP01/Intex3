// src/api/useOtherLists.ts
import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { FeaturedMovie } from '../types/FeaturedMovie';
import { useUser } from '../context/UserContext'; // ✅ custom hook

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
  const { userId } = useUser(); // ✅ use your custom context hook
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

  useEffect(() => {
    if (!userId) return;

    const fetchPersonalized = async () => {
      try {
        const base = import.meta.env.VITE_API_URL;

        const fetchList = async (
          url: string,
          transform: (data: any) => void
        ) => {
          const res = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });
          if (!res.ok) throw new Error(`${url} failed (${res.status})`);
          const data = await res.json();
          transform(data);
        };

        await fetchList(
          `${base}/api/recommendations/category/${userId}/rewatch_favorite`,
          (data) => {
            setRewatchFavorites({
              category: 'Rewatch Favorites',
              movies: data.map((m: Movie) => toFeatured(m)),
            });
          }
        );

        await fetchList(
          `${base}/api/recommendations/category/${userId}/top_picks`,
          (data) => {
            setTopPicks({
              category: 'Top Picks for You',
              movies: data.map((m: Movie) => toFeatured(m)),
            });
          }
        );

        await fetchList(
          `${base}/api/recommendations/topRated/${userId}`,
          (data) => {
            const group: MovieGroup = {
              category: 'Because You Liked...',
              movies: data.map((m: Movie) => toFeatured(m)),
            };
            setSinceYouLiked([group]);
          }
        );

        await fetchList(
          `${base}/api/recommendations/category/${userId}/genre_recommendation`,
          (data) => {
            const genreGroups: Record<string, Movie[]> = {};
            for (const m of data) {
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
          }
        );
      } catch (err) {
        console.error(err);
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
