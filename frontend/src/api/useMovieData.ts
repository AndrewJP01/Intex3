import { useEffect, useState } from "react";
import { RawMovie } from '../types/RawMovie';

export type Movie = {
  title: string;
  genre: string;  // Single source of truth
  imageUrl?: string;
  id?: string | number;
  description?: string;
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
          credentials: 'include',
        });

        if (!res.ok) {
          if (res.status === 401) {
            window.alert('Unauthorized. Please log in to continue.');
          }
          throw new Error(`Failed to fetch movies (Status code: ${res.status})`);
        }

        const data = await res.json();

        const transformed: Movie[] = data.map((item: any) => ({
          title: item.title,
          genre: Array.isArray(item.genres)
          ? item.genres
              .map((g: any) => typeof g === 'string' ? g : g.genre)
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
        console.log('ANother Genres', transformed);
        setAllMovies(transformed);
        setFilteredMovies(transformed);

        const defaultCounts: Record<string, number> = {};
        transformed.forEach(movie => {
          const cat = movie.genre;
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
        const matchesGenre =
        selectedCategories.length === 0 ||
        selectedCategories.some((genre) => movie.genre.includes(genre)); // <---- THIS LINE IS THE FIX
    
      return matchesSearch && matchesGenre;
    });
    

    setFilteredMovies(filtered);
  }, [searchTerm, selectedCategories, allMovies]);

  const groupedByCategory = filteredMovies.reduce((acc, movie) => {
    const categories = movie.genre.split(',').map((c) => c.trim());  // Split on comma
  
    categories.forEach((category) => {
      if (!acc[category]) acc[category] = [];
      acc[category].push(movie);
    });
  
    return acc;
  }, {} as Record<string, Movie[]>);
  
  
  

  const loadMoreByGenre = (genre: string) => {
    setVisibleCounts(prev => ({
      ...prev,
      [genre]: (prev[genre] || initialCount) + 6
    }));
  };
  

  return {
    groupedByCategory,
    isLoading,
    error,
    loadMoreByGenre
  };
  
}
