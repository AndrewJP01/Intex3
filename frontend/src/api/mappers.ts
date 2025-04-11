import { FeaturedMovie } from '../types/FeaturedMovie';

export const buildImageUrl = (title: string | undefined): string => {
  if (!title || title.toLowerCase().includes("null") || title.trim() === "") {
    return '/fallback.jpg'; // Use fallback if title sucks
  }
  return `https://localhost:7023/Movie%20Posters/${encodeURIComponent(title)}.jpg`;
};

export const toMovie = (raw: any, category?: string): FeaturedMovie => ({
  title: raw.title || 'Untitled',
  genre: raw.genre || category || 'Uncategorized',
  show_id: raw.show_id?.toString(),
  imageUrl: raw.imageUrl && !raw.imageUrl.toLowerCase().includes("null")
    ? raw.imageUrl
    : '/fallback.jpg',
  description: raw.description || 'No description available',
  rating: raw.rating || 'NR',
  duration: raw.duration || 'Length TBD',
  releaseDate: raw.releaseDate || raw.release_year || 0,
});
