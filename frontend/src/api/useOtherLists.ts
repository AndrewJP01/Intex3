""// src/api/useFeaturedMovies.ts
import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { FeaturedMovie } from '../types/FeaturedMovie';

export type MovieGroup = {
  category: string;
  movies: FeaturedMovie[];
};

const buildImageUrl = (title: string): string => {
  return `https://localhost:7023/Movie%20Posters/${encodeURIComponent(title)}.jpg`;
};

export const toFeatured = (movie: Movie, category?: string): FeaturedMovie => {
  if (!movie.show_id) {
    console.warn(`⚠️ Missing show_id in movie:`, movie.title);
  }

  return {
    show_id: movie.show_id ?? '',
    title: movie.title,
    description: movie.description,
    imageUrl: buildImageUrl(movie.title),
    genre: movie.genre || '',
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
  const [error, setError] = useState("");

  const userId = 11; // 🔒 TEMP: Hardcoded until auth is integrated



  useEffect(() => {
    const fetchPersonalized = async () => {
      try {
        // 1. Rewatch Favorites
        const rewatchRes = await fetch(
          `https://localhost:7023/api/recommendations/category/${userId}/rewatch_favorite`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });
        const rewatchData = await rewatchRes.json();
        console.log('🔁 Rewatch Raw:', rewatchData);
        setRewatchFavorites({
          category: 'Rewatch Favorites',
          movies: rewatchData.map((m: Movie) => toFeatured(m, 'Rewatch')),
        });

        // 2. Top Picks
        const topPickRes = await fetch(
          `https://localhost:7023/api/recommendations/category/${userId}/top_picks`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });
        const topPicksData = await topPickRes.json();
        console.log('🎯 Top Picks Raw:', topPicksData);
        setTopPicks({
          category: 'Top Picks for You',
          movies: topPicksData.map((m: Movie) => toFeatured(m, 'Top Picks')),
        });

        // 3. Since You Liked (your buddy’s recommender)
        const topRated = await fetch(`https://localhost:7023/api/recommendations/topRated/${userId}`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        
        const sinceYouLikedData = await topRated.json();
        
        const similarGroups: MovieGroup[] = sinceYouLikedData.map((group: any) => ({
          category: group.category,
          movies: group.movies.map((m: Movie) => toFeatured(m, group.category)),
        }));
        
        setSinceYouLiked(similarGroups);
        
        
        

        // 4. Genre Recs

        const genreRes = await fetch(`https://localhost:7023/api/recommendations/category/${userId}/genre_recommendation`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const genreData = await genreRes.json();
        console.log('🎭 Genre Raw:', genreData);

        // Group by genre
        const genreGroups: Record<string, Movie[]> = {};
        for (const m of genreData) {
          const genre = m.genre || 'Other';
          if (!genreGroups[genre]) genreGroups[genre] = [];
          genreGroups[genre].push(m);
        }

        const entries = Object.entries(genreGroups)
          .sort(() => 0.5 - Math.random()) // shuffle
          .slice(0, 10) // get 10
          .map(([genre, movies]) => ({
            category: `${genre} Recommendations For You`,
            movies: movies.map((m: Movie) => toFeatured(m, genre)),
          }));

        console.log('🎭 Final Transformed Genre Groups:', entries); // 🧠 LOG 2  

        setGenreRecommendations(entries);
      } catch (err) {
        setError("Failed to load personalized recommendations.");
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