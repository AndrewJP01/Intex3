import React, { useState, useEffect } from "react";
import styles from "../pages/MovieHomePage.module.css";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.css';  // In your component or main entry file


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
  const [loading, setLoading] = useState(true);
  const moviesPerPage = 7;

  useEffect(() => {
    setLoading(true);
    const loadValidMovies = async () => {
      const filteredMovies = [];
      for (const movie of movies) {
        const imageUrl = movie.imageUrl || getMovieImageUrl(movie.title);
        if (await checkImage(imageUrl)) {
          filteredMovies.push(movie);
        }
      }
      setValidMovies(filteredMovies);
      setLoading(false);
    };

    loadValidMovies();
  }, [movies]);

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

  const transformX = -(100 / moviesPerPage) * currentIndex;

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
        {loading ? (
          <div className={styles.spinner}></div>
        ) : (
          <>
            <button className={styles.carouselPrev} onClick={handlePrevClick}>&#10094;</button>
            <div className={styles.carouselTrack} style={{ transform: `translateX(${transformX})`, transition: 'transform 0.5s ease' }}>
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
                ))
              }
            </div>
            <button className={styles.carouselNext} onClick={handleNextClick}>&#10095;</button>
          </>
        )}
      </div>
    </section>
  );
};