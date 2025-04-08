import { useEffect, useState } from "react";



export type Movie = {
  title: string;
  category: string;
  imageUrl?: string;
  id?: string | number;
  description: string | null; // Adjust based on actual data possibility

};

export function useMovieData(searchTerm: string, selectedCategories: string[]) {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:5166/api/Admin/movies");
        if (!res.ok) throw new Error("Failed to fetch movies");

        const data = await res.json();
        const transformed: Movie[] = data.map((item: any) => ({
          title: item.title,
          category: item.genres?.[0] || "Uncategorized",
          id: item.show_id.toString(),  // Make sure id is a string if required by your type
          imageUrl: item.imageUrl || undefined,
          description: item.description || 'No description available',
        }));

        setAllMovies(transformed);
        setFilteredMovies(transformed);
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
    acc[movie.category] = acc[movie.category] || [];
    acc[movie.category].push(movie);
    return acc;
  }, {} as Record<string, Movie[]>);

  return { groupedByCategory, isLoading, error };
}
