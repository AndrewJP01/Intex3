import { useEffect, useState } from "react";

export type Movie = {
  title: string;
  category: string;
  imageUrl?: string;
  id?: string | number;
  description?: string;
  genre: string;
  rating: string;
  duration: string;
  releaseDate: number;
  show_id?: string;
};

export function useMovieData(searchTerm: string, selectedCategories: string[]) {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const initialCount = 6;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('https://localhost:7023/api/Admin/movies', {
          method: 'GET',
          credentials: 'include', // ✅ sends auth cookie!
        });

        // If the response is not ok, check for a 401 error and show a popup if so.
        if (!res.ok) {
          if (res.status === 401) {
            window.alert('Unauthorized. Please log in to continue.');
          }
          throw new Error(
            `Failed to fetch movies (Status code: ${res.status})`
          );
        }

        const data = await res.json();
        const transformed: Movie[] = data.map((item: any) => ({
          title: item.title,
          category: item.genres?.[0] || 'Uncategorized',
          show_id: item.show_id.toString(),
          imageUrl: item.imageUrl || undefined,
          description: item.description || 'No description available',
          genre: item.genre,
          rating: item.rating,
          duration: item.duration,
          releaseDate: item.release_year, // 👈 typo? maybe should be item.release_year
        }));

        setAllMovies(transformed);
        setFilteredMovies(transformed);

        // Initialize visible counts per genre
        const defaultCounts: Record<string, number> = {};
        transformed.forEach(movie => {
          const cat = movie.category;
          defaultCounts[cat] = initialCount;
        });
        setVisibleCounts(defaultCounts);

        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const filtered = allMovies.filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(movie.category);
      return matchesSearch && matchesCategory;
    });

    setFilteredMovies(filtered);
  }, [searchTerm, selectedCategories, allMovies]);

  const groupedByCategory = filteredMovies.reduce((acc, movie) => {
    const category = movie.category;
    acc[category] = acc[category] || [];
    const limit = visibleCounts[category] || initialCount;
    if (acc[category].length < limit) {
      acc[category].push(movie);
    }
    return acc;
  }, {} as Record<string, Movie[]>);

  const loadMoreByCategory = (category: string) => {
    setVisibleCounts(prev => ({
      ...prev,
      [category]: (prev[category] || initialCount) + 6
    }));
  };

  return {
    groupedByCategory,
    isLoading,
    error,
    loadMoreByCategory
  };
}
