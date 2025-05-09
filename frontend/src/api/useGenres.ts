import { useEffect, useState } from 'react';
export function useGenres() {
  const [genres, setGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/Admin/genres`,
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
            window.alert('Unauthorized. Please log in to continue.');
          }
          const errorText = await res.text();
          throw new Error(
            `Failed to fetch genres (Status: ${res.status}) - ${errorText}`
          );
        }
        const rawData: { genre: string }[] = await res.json();
        const cleaned = Array.from(
          new Set(
            rawData
              .map((g) => g.genre?.trim())
              .filter((g): g is string => typeof g === 'string' && g.length > 0)
          )
        ).sort();
        setGenres(cleaned);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
        setIsLoading(false);
      }
    };
    fetchGenres();
  }, []);
  return { genres, isLoading, error };
}