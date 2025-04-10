import { RawMovie } from '../types/RawMovie';
import { Movie } from '../types/Movie';
import { buildImageUrl } from '../utils/buildImageUrl'; // (if extracted)

export const toMovie = (raw: RawMovie, category?: string): Movie => ({
  show_id: raw.show_id,
  title: raw.title,
  description: raw.description || 'No description available',
  imageUrl: buildImageUrl(raw.title),
  genre: raw.category || '',
  rating: raw.rating || 'NR',
  duration: raw.duration || 'Length TBD',
  releaseDate: raw.release_year,
  category,
});
