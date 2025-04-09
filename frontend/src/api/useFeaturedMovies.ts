// src/api/useFeaturedMovies.ts
import { useEffect, useState } from "react";

export type FeaturedMovie = {
    show_id: string;
  title: string;
  description?: string;
  imageUrl: string;
};

export const useFeaturedMovies = () => {
  const [featuredMovies, setFeaturedMovies] = useState<FeaturedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("http://localhost:5166/api/Admin/top-rated");
        if (!res.ok) throw new Error("Failed to fetch featured movies");
        const data = await res.json();
        setFeaturedMovies(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { featuredMovies, loading, error };
};
