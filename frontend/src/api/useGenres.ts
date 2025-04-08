import { useEffect, useState } from "react";

export function useGenres() {
  const [genres, setGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch("http://localhost:5166/api/Admin/genres");
        if (!res.ok) throw new Error("Failed to fetch genres");

        const rawData: { genre: string }[] = await res.json();

        const cleaned = Array.from(
          new Set(
            rawData
              .map((g) => g.genre?.trim())
              .filter((g): g is string => typeof g === "string" && g !== "")
          )
        ).sort();

        console.log("✅ Fetched Genres:", cleaned);
        setGenres(cleaned);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || "Unknown error");
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, isLoading, error };
}
