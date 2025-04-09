import { useState, useEffect } from 'react';
import './ManageMovieModal.css';

type Props = {
  mode: 'add' | 'edit';
  onClose: () => void;
  onSave: (movieData: any) => void;
  initialData?: any;
  genres: string[];
  ratings: string[];
  directors: string[];
};

const ManageMovieModal = ({
  mode,
  onClose,
  onSave,
  initialData = {},
  genres,
  ratings,
  directors
}: Props) => {
  const [form, setForm] = useState({
    title: '',
    director: '',
    genres: [] as string[],
    rating: '',
    duration: '',
    type: '',
    description: '',
    year: '',
    image: null as File | null
  });

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      const initialGenres = initialData.genres?.split(', ').filter((g: string) => g.trim()) ?? [];

      setForm({
        title: initialData.title || '',
        director: initialData.director || '',
        genres: initialGenres.length > 0 ? initialGenres : ['No Genres Added'],
        rating: initialData.rating || '',
        duration: initialData.duration || '',
        type: initialData.type || '',
        description: initialData.description || '',
        year: initialData.release_year?.toString() || '',
        image: null
      });
    }
  }, [mode, initialData]);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!form.title.trim()) errors.title = 'Title is required';
    if (!form.director.trim()) errors.director = 'Director is required';
    if (!form.description.trim()) errors.description = 'Description is required';
    if (!form.genres || form.genres.length === 0 || form.genres[0] === 'No Genres Added') errors.genres = 'At least one genre is required';
    if (!form.rating) errors.rating = 'Rating is required';
    if (!form.type) errors.type = 'Type is required';
    if (!form.duration.trim()) errors.duration = form.type === 'TV Show' ? 'Season count is required' : 'Duration (mins) is required';
    if (!form.year.trim()) errors.year = 'Year is required';
    return errors;
  };

  const toggleGenre = (genre: string) => {
    setForm((prev) => {
      let updatedGenres = [...prev.genres];

      if (genre === 'No Genres Added') {
        if (updatedGenres.length === 0 || updatedGenres.includes('No Genres Added')) {
          updatedGenres = ['No Genres Added'];
        }
      } else {
        if (updatedGenres.includes(genre)) {
          updatedGenres = updatedGenres.filter((g) => g !== genre);
        } else {
          updatedGenres = [...updatedGenres.filter((g) => g !== 'No Genres Added'), genre];
        }

        if (updatedGenres.length === 0) {
          updatedGenres = ['No Genres Added'];
        }
      }

      return {
        ...prev,
        genres: updatedGenres
      };
    });
  };

  const toggleRating = (rating: string) => {
    setForm((prev) => ({
      ...prev,
      rating: prev.rating === rating ? '' : rating
    }));
  };

  const toggleType = (type: string) => {
    setForm((prev) => ({
      ...prev,
      type: prev.type === type ? '' : type
    }));
  };

  const handleSave = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});
    onSave(form);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{mode === 'add' ? 'Add New Movie' : 'Edit Movie'}</h2>

        <div className="input-group">
          <label>Title</label>
          <input type="text" value={form.title} onChange={(e) => handleChange('title', e.target.value)} />
          {validationErrors.title && <small style={{ color: 'red' }}>{validationErrors.title}</small>}
        </div>

        <div className="input-group">
          <label>Director</label>
          <input type="text" value={form.director} onChange={(e) => handleChange('director', e.target.value)} list="director-suggestions" />
          <datalist id="director-suggestions">
            {directors.map((d) => (
              <option key={d} value={d} />
            ))}
          </datalist>
          {validationErrors.director && <small style={{ color: 'red' }}>{validationErrors.director}</small>}
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} />
          {validationErrors.description && <small style={{ color: 'red' }}>{validationErrors.description}</small>}
        </div>

        <div className="filter-bubbles">
          <label>Genres</label>
          {genres.map((g) => (
            <button key={g} className={`bubble ${form.genres.includes(g) ? 'active' : ''}`} onClick={() => toggleGenre(g)}>
              {g}
            </button>
          ))}
          {validationErrors.genres && <small style={{ color: 'red' }}>{validationErrors.genres}</small>}
        </div>

        <div className="filter-bubbles">
          <label>Rating</label>
          {ratings.map((r) => (
            <button key={r} className={`bubble ${form.rating === r ? 'active' : ''}`} onClick={() => toggleRating(r)}>
              {r}
            </button>
          ))}
          {validationErrors.rating && <small style={{ color: 'red' }}>{validationErrors.rating}</small>}
        </div>

        <div className="filter-bubbles">
          <label>Type</label>
          {['TV Show', 'Movie'].map((t) => (
            <button key={t} className={`bubble ${form.type === t ? 'active' : ''}`} onClick={() => toggleType(t)}>
              {t}
            </button>
          ))}
          {validationErrors.type && <small style={{ color: 'red' }}>{validationErrors.type}</small>}
        </div>

        <div className="input-group">
          <label>{form.type === 'TV Show' ? 'Seasons' : 'Duration (mins)'}</label>
          <input type="text" value={form.duration} onChange={(e) => handleChange('duration', e.target.value)} />
          {validationErrors.duration && <small style={{ color: 'red' }}>{validationErrors.duration}</small>}
        </div>

        <div className="input-group">
          <label>Year</label>
          <input type="number" value={form.year} onChange={(e) => handleChange('year', e.target.value)} />
          {validationErrors.year && <small style={{ color: 'red' }}>{validationErrors.year}</small>}
        </div>

        <div className="input-group">
          <label>Upload Poster</label>
          <input type="file" onChange={(e) => handleChange('image', e.target.files?.[0] || null)} />
        </div>

        <div className="apply-button-wrapper">
          <button className="apply-btn" onClick={handleSave}>{mode === 'add' ? 'Add Movie' : 'Save Changes'}</button>
          <button className="btn close" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ManageMovieModal;
