import React, { useEffect, useState } from "react";
import { ContentCarousel } from "../components/ContentCarousel";

type Movie = {
    title: string;
    category: string;
    imageUrl?: string;
    id?: string | number;
    description?: string;
    genre?: string;
    rating?: string;
    duration?: string;
    show_id?: string;
    releaseDate?: number;
};

interface Props {
  showId: string;
  title: string;
}

const RecommendationsSection: React.FC<Props> = ({ showId, title }) => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(`https://localhost:7023/api/recommendations/${showId}`);
        if (!res.ok) throw new Error("Failed to fetch recommendations");

        const data = await res.json();
        setRecommendedMovies(data);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
      }
    };

    if (showId) fetchRecommendations();
  }, [showId]);

  return (
    <>
      {recommendedMovies.length > 0 && (
        <ContentCarousel
          title={`Shows similar to ${title}...`}
          movies={recommendedMovies}
          delayRender={100}
        />
      )}
    </>
  );
};

export default RecommendationsSection;
