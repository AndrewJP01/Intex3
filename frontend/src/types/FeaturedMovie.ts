export type FeaturedMovie = {
  title: string;
  genre: string;  // Single source of truth
  imageUrl?: string;
  id?: string | number;
  description?: string;
  rating: string;
  duration: string;
  releaseDate: number;
  show_id?: string;
  category?: string;  // <-- ADD THIS LINE
};
