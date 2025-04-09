// src/api/useFeaturedMovies.ts
import { useEffect, useState } from 'react';

export type FeaturedMovie = {
  show_id: string;
  title: string;
  description?: string;
  imageUrl: string;
};

export const useFeaturedMovies = () => {
  const [featuredMovies, setFeaturedMovies] = useState<FeaturedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('https://localhost:7023/api/Admin/top-rated', {
          method: 'GET',
          credentials: 'include', // ✅ include auth cookie
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            window.alert('Unauthorized. Please log in to see featured movies.');
          }
          throw new Error(
            `Failed to fetch featured movies (Status: ${res.status})`
          );
        }

        const data = await res.json();
        setFeaturedMovies(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { featuredMovies, loading, error };
};
