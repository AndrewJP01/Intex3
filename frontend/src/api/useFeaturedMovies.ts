import { useEffect, useState } from 'react';

export type FeaturedMovie = {
  show_id: string;
  title: string;
  description?: string;
  imageUrl: string;
};

export const useFeaturedMovies = () => {
  const [featuredMovies, setFeaturedMovies] = useState<FeaturedMovie[]>([]);
  const [personalizedMovies, setPersonalizedMovies] = useState<FeaturedMovie[]>(
    []
  );
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
        setFeaturedMovies(data);
      } catch (err: any) {
        setError(
          err.message || 'Unknown error while fetching featured movies.'
        );
      }
    };

    const fetchPersonalized = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/recommendations/topRated/1`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(
            `Personalized fetch failed (Status: ${res.status}) - ${text}`
          );
        }

        const data = await res.json();
        setPersonalizedMovies(data);
      } catch (err: any) {
        setError(
          err.message || 'Unknown error while fetching personalized movies.'
        );
      }
    };

    Promise.all([fetchFeatured(), fetchPersonalized()]).finally(() =>
      setLoading(false)
    );
  }, []);

  return {
    featuredMovies,
    personalizedMovies,
    loading,
    error,
  };
};
