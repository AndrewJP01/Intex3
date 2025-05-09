import { useEffect, useState } from 'react';
export type FeaturedMovie = {
  title: string;
  genre: string; // Single source of truth
  imageUrl?: string;
  id?: string | number;
  description?: string;
  rating: string;
  duration: string;
  releaseDate: number;
  show_id?: string;
};
export const useFeaturedMovies = () => {
  const [featuredMovies, setFeaturedMovies] = useState<FeaturedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/Admin/top-rated`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (!res.ok) {
          if (res.status === 401) {
            window.alert('Unauthorized. Please log in to see featured movies.');
          }
          const text = await res.text();
          throw new Error(
            `Featured fetch failed (Status: ${res.status}) - ${text}`
          );
        }
        const data = await res.json();
        const transformed = data.map((item: any) => ({
          title: item.title,
          genre: Array.isArray(item.genres)
            ? item.genres
                .map((g: any) => (typeof g === 'string' ? g : g.genre))
                .filter((g: string) => g && g.trim() !== '')
                .join(', ')
            : '',
          show_id: item.show_id.toString(),
          imageUrl: item.imageUrl || undefined,
          description: item.description || 'No description available',
          rating: item.rating || 'NR',
          duration: item.duration || 'Length TBD',
          releaseDate: item.release_year,
        }));
        setFeaturedMovies(transformed);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);
  return {
    featuredMovies,
    loading,
    error,
  };
};