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
        const res = await fetch("http://localhost:5166/api/Admin/movies");
        if (!res.ok) throw new Error("Failed to fetch movies");

        const data = await res.json();
        const transformed: Movie[] = data.map((item: any) => ({
          title: item.title,
          category: item.genres?.[0] || "Uncategorized",
          show_id: item.show_id.toString(),
          imageUrl: item.imageUrl || undefined,
          description: item.description || 'No description available',
          genre: item.genre,
          rating: item.rating,
          duration: item.duration,
          releaseDate: item.realease_year,
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
        setError(err.message || "Unknown error");
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const filtered = allMovies.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(movie.category);
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
