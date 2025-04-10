import { useEffect, useState } from 'react';
import { RawMovie } from '../types/RawMovie';
import { FeaturedMovie } from '../types/FeaturedMovie';
import { toMovie } from './mappers';

export type MovieGroup = {
  category: string;
  movies: FeaturedMovie[];
};

export const useFeaturedMovies = () => {
  const userId = 11; // TEMP: Hardcoded until auth is integrated

  const [featuredMovies, setFeaturedMovies] = useState<FeaturedMovie[]>([]);
  const [rewatchFavorites, setRewatchFavorites] = useState<MovieGroup | null>(null);
  const [topPicks, setTopPicks] = useState<MovieGroup | null>(null);
  const [sinceYouLiked, setSinceYouLiked] = useState<MovieGroup[]>([]);
  const [genreRecommendations, setGenreRecommendations] = useState<MovieGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetchAndTransform = async (
    url: string,
    category?: string
  ): Promise<FeaturedMovie[]> => {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) throw new Error(`Failed to fetch (Status: ${res.status})`);

    const data = await res.json();
    return data.map((m: RawMovie) => toMovie(m, category));
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const featured = await fetchAndTransform('https://localhost:7023/api/Admin/top-rated');
        setFeaturedMovies(featured);

        const rewatch = await fetchAndTransform(
          `https://localhost:7023/api/recommendations/category/${userId}/rewatch_favorite`,
          'Rewatch'
        );
        setRewatchFavorites({ category: 'Rewatch Favorites', movies: rewatch });

        const topPicks = await fetchAndTransform(
          `https://localhost:7023/api/recommendations/category/${userId}/top_picks`,
          'Top Picks'
        );
        setTopPicks({ category: 'Top Picks for You', movies: topPicks });

        const sinceYouLikedRes = await fetch(
          `https://localhost:7023/api/recommendations/topRated/${userId}`
        );
        const sinceYouLikedData = await sinceYouLikedRes.json();

        setSinceYouLiked(
          sinceYouLikedData.map((group: any) => ({
            category: group.category,
            movies: group.movies.map((m: RawMovie) => toMovie(m, group.category)),
          }))
        );

        const genreRes = await fetch(
          `https://localhost:7023/api/recommendations/category/${userId}/genre_recommendation`
        );
        const genreData = await genreRes.json();

        const genreGroups: Record<string, RawMovie[]> = {};
        for (const m of genreData) {
          const genre = m.genre || 'Other';
          if (!genreGroups[genre]) genreGroups[genre] = [];
          genreGroups[genre].push(m);
        }

        const genreEntries = Object.entries(genreGroups)
          .sort(() => 0.5 - Math.random())
          .slice(0, 10)
          .map(([genre, movies]) => ({
            category: `${genre} Recommendations For You`,
            movies: movies.map((m) => toMovie(m, genre)),
          }));

        setGenreRecommendations(genreEntries);
      } catch (err) {
        setError((err as Error).message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return {
    featuredMovies,
    rewatchFavorites,
    topPicks,
    sinceYouLiked,
    genreRecommendations,
    loading,
    error,
  };
};
