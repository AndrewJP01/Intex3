import React, { useState, useEffect } from "react";
import styles from "../pages/MovieHomePage.module.css";
import { useNavigate } from "react-router-dom";

type Movie = {
  title: string;
  category: string;
  imageUrl?: string; // make sure this is defined
  id?: string | number;
};

type ContentCarouselProps = {
  title: string;
  movies: {
    title: string;
    category: string;
    imageUrl?: string; // optional
    id?: string | number; // optional for navigation
  }[];
};

export const ContentCarousel: React.FC<ContentCarouselProps> = ({ title, movies }) => {
  const navigate = useNavigate();
  const [validMovies, setValidMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const moviesPerPage = 5;  // Assuming you want to show 5 movies at a time
  

  useEffect(() => {
    const loadValidMovies = async () => {
      const filteredMovies = [];
      for (const movie of movies) {
        const imageUrl = movie.imageUrl || getMovieImageUrl(movie.title);
        if (await checkImage(imageUrl)) {
          filteredMovies.push(movie);
        }
      }
      setValidMovies(filteredMovies);
    };

    loadValidMovies();
  }, [movies]); // Dependency array ensures the effect runs when movies prop changes

  const handleMovieClick = (movieId: string | number | undefined) => {
    if (movieId) {
      navigate(`/movies/${movieId}`);
    }
  };


const handleNextClick = () => {
    const maxIndex = Math.ceil(validMovies.length / moviesPerPage) - 1;
    setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : prevIndex));
};

const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
};


  const getMovieImageUrl = (movieTitle: string) => {
    const formattedTitle = encodeURIComponent(movieTitle);
    const url = `http://localhost:5166/Movie%20Posters/${formattedTitle}.jpg`;
    console.log("Image URL:", url);
    return url;
  };

  const checkImage = async (url: RequestInfo | URL) => {
    try {
      const response = await fetch(url);
      return response.ok; // Returns true if the status code is within 200-299
    } catch (error) {
      console.log("Error fetching image:", error);
      return false; // Assume image is not valid if an error occurs
    }
  };

  return (
    <section className={styles.carouselSection}>
      <h2 className={styles.carouselTitle}>{title}</h2>
      <div className={styles.carouselContainer}>
    <button className={styles.carouselPrev} onClick={handlePrevClick}>&#10094;</button>
          <div className={styles.carouselTrack}>
          {validMovies
              .slice(currentIndex * moviesPerPage, (currentIndex + 1) * moviesPerPage)
              .map((movie) => (
                  <div
                      key={movie.title}
                      className={styles.carouselItem}
                      onClick={() => handleMovieClick(movie.id)}
                  >
                      <img
                          src={movie.imageUrl || getMovieImageUrl(movie.title)}
                          alt={movie.title}
                          className={styles.movieImage}
                      />
                      <div className={styles.movieTitle}>{movie.title || "Untitled"}</div>
                  </div>
              ))}
      </div>

          <button className={styles.carouselNext} onClick={handleNextClick}>&#10095;</button>
      </div>

    </section>
  );
};