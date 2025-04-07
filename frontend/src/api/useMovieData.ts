import { useEffect, useState } from "react";

export type Movie = {
  title: string;
  category: string;
};

export function useMovieData(searchTerm: string, selectedCategories: string[]) {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const movies: Movie[] = [
        { title: "Avengers", category: "Action" },
        { title: "Indiana Jones", category: "Adventure" },
        { title: "Spirited Away", category: "Anime Series International TV Shows" },
        { title: "The Crown", category: "British TV Shows Docuseries International TV Shows" },
        { title: "Finding Nemo", category: "Children" },
        { title: "The Hangover", category: "Comedies" },
        { title: "Parasite", category: "Comedies Dramas International Movies" },
        { title: "Lupin", category: "Comedies International Movies" },
        { title: "Crazy Rich Asians", category: "Comedies Romantic Movies" },
        { title: "Making a Murderer", category: "Crime TV Shows Docuseries" },
        { title: "Planet Earth", category: "Documentaries" },
        { title: "My Octopus Teacher", category: "Documentaries International Movies" },
        { title: "Tiger King", category: "Docuseries" },
        { title: "The Godfather", category: "Dramas" },
        { title: "Roma", category: "Dramas International Movies" },
        { title: "The Notebook", category: "Dramas Romantic Movies" },
        { title: "The Incredibles", category: "Family Movies" },
        { title: "Harry Potter", category: "Fantasy" },
        { title: "The Conjuring", category: "Horror Movies" },
        { title: "Train to Busan", category: "International Movies Thrillers" },
        { title: "Crash Landing on You", category: "International TV Shows Romantic TV Shows TV Dramas" },
        { title: "Paw Patrol", category: "Kids' TV" },
        { title: "Money Heist", category: "Language TV Shows" },
        { title: "La La Land", category: "Musicals" },
        { title: "Our Planet", category: "Nature TV" },
        { title: "Too Hot to Handle", category: "Reality TV" },
        { title: "The Chosen", category: "Spirituality" },
        { title: "Jack Ryan", category: "TV Action" },
        { title: "Brooklyn Nine-Nine", category: "TV Comedies" },
        { title: "Breaking Bad", category: "TV Dramas" },
        { title: "Comedians in Cars Getting Coffee", category: "Talk Shows TV Comedies" },
        { title: "Gone Girl", category: "Thrillers" },
      ];
      

    setAllMovies(movies);
    setFilteredMovies(movies);
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

  return { groupedByCategory };
}
