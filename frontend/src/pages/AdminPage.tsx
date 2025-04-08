// src/pages/AdminPage.tsx
import React, { useState, useEffect } from 'react';
import {
  FaFilm,
  FaUser,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
  FaVideo,
  FaTag,
} from 'react-icons/fa';
import './AdminPage.css';

type Movie = {
  show_id: string;
  title: string;
  genres: string;
  type: string;
  rating: string;
  director: string;
  release_year: number;
  imageUrl: string;
};

const AdminPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(15); // 👈 NEW

  const [availableGenres, setAvailableGenres] = useState<string[]>([]);
  const [availableRatings, setAvailableRatings] = useState<string[]>([]);
  const [availableDirectors, setAvailableDirectors] = useState<string[]>([]);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [startYear, setStartYear] = useState<number | null>(null);
  const [endYear, setEndYear] = useState<number | null>(null);
  const [directorInput, setDirectorInput] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('none');

  const [pendingFilters, setPendingFilters] = useState({
    selectedGenres: [] as string[],
    selectedRatings: [] as string[],
    startYear: null as number | null,
    endYear: null as number | null,
    directorInput: '',
    sortOption: 'none',
  });

  const openFilterModal = () => {
    setPendingFilters({
      selectedGenres,
      selectedRatings,
      startYear,
      endYear,
      directorInput,
      sortOption,
    });
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => setIsFilterModalOpen(false);

  const applyFilters = () => {
    setSelectedGenres(pendingFilters.selectedGenres);
    setSelectedRatings(pendingFilters.selectedRatings);
    setStartYear(pendingFilters.startYear);
    setEndYear(pendingFilters.endYear);
    setDirectorInput(pendingFilters.directorInput);
    setSortOption(pendingFilters.sortOption);
    setIsFilterModalOpen(false);
    setVisibleCount(15); // Reset to show only 15 results after applying filters
  };

  const toggleGenre = (genre: string) => {
    setPendingFilters((prev) => ({
      ...prev,
      selectedGenres: prev.selectedGenres.includes(genre)
        ? prev.selectedGenres.filter((g) => g !== genre)
        : [...prev.selectedGenres, genre],
    }));
  };

  const toggleRating = (rating: string) => {
    setPendingFilters((prev) => ({
      ...prev,
      selectedRatings: prev.selectedRatings.includes(rating)
        ? prev.selectedRatings.filter((r) => r !== rating)
        : [...prev.selectedRatings, rating],
    }));
  };

  const resetFilters = () => {
    setSelectedGenres([]);
    setSelectedRatings([]);
    setStartYear(null);
    setEndYear(null);
    setDirectorInput('');
    setSortOption('none');
    setVisibleCount(15); // Reset count
  };

  useEffect(() => {
    fetch('http://localhost:5166/api/admin/movies')
      .then((res) => res.json())
      .then((data) => {
        const moviesWithImages = data.map((m: any) => ({
          show_id: m.show_id,
          title: m.title,
          genres: Array.isArray(m.genres) ? m.genres.join(', ') : 'Unknown',
          type: m.type || 'Unknown',
          rating: m.rating || 'Unrated',
          director: m.director || 'Unknown',
          release_year: m.release_year,
          imageUrl: `/posters/${encodeURIComponent(m.title)}.jpg`,
        }));
        setMovies(moviesWithImages);
        setLoading(false);

        const genreSet = new Set<string>();
        const ratingSet = new Set<string>();
        const directorSet = new Set<string>();

        data.forEach((m: any) => {
          if (Array.isArray(m.genres)) m.genres.forEach((g: any) => genreSet.add(g));
          if (m.rating) ratingSet.add(m.rating);
          if (m.director) directorSet.add(m.director);
        });

        setAvailableGenres(Array.from(genreSet).sort());
        setAvailableRatings(Array.from(ratingSet).sort());
        setAvailableDirectors(Array.from(directorSet).sort());
      })
      .catch((err) => {
        console.error('Failed to fetch movies:', err);
        setLoading(false);
      });
  }, []);

  const getFilteredMovies = () => {
    let filtered = movies.filter((movie) => {
      const genreMatch =
        selectedGenres.length === 0 || selectedGenres.some((g) => movie.genres.includes(g));
      const ratingMatch =
        selectedRatings.length === 0 || selectedRatings.includes(movie.rating);
      const yearMatch =
        (!startYear || movie.release_year >= startYear) &&
        (!endYear || movie.release_year <= endYear);
      const directorMatch =
        directorInput.trim() === '' ||
        movie.director.toLowerCase().includes(directorInput.toLowerCase());

      return genreMatch && ratingMatch && yearMatch && directorMatch;
    });

    switch (sortOption) {
      case 'title-asc': filtered.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'title-desc': filtered.sort((a, b) => b.title.localeCompare(a.title)); break;
      case 'year-asc': filtered.sort((a, b) => a.release_year - b.release_year); break;
      case 'year-desc': filtered.sort((a, b) => b.release_year - a.release_year); break;
      case 'genre-asc': filtered.sort((a, b) => a.genres.localeCompare(b.genres)); break;
      case 'genre-desc': filtered.sort((a, b) => b.genres.localeCompare(a.genres)); break;
    }

    return filtered;
  };

  const filteredMovies = getFilteredMovies();
  const filtersAreActive =
    selectedGenres.length > 0 ||
    selectedRatings.length > 0 ||
    startYear !== null ||
    endYear !== null ||
    directorInput.trim() !== '' ||
    sortOption !== 'none';

  const handleEdit = (id: string) => console.log(`Edit movie with id: ${id}`);
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      setMovies((prev) => prev.filter((m) => m.show_id !== id));
    }
  };

  return (
    <>
      <div className="admin-background">
        <div className="admin-page-wrapper">
          <header className="admin-header"><h1>Admin Dashboard</h1></header>
  
          <section className="admin-controls">
            <button className="btn primary"><FaPlus /> Add New</button>
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search Movies..." />
            </div>
            <button className={`btn ${filtersAreActive ? 'active-filter' : ''}`} onClick={openFilterModal}>
              Filter Movies
            </button>
            {filtersAreActive && (
              <button className="btn reset-btn" onClick={resetFilters} title="Reset Filters">
                &#x21bb;
              </button>
            )}
          </section>
  
          <div className="movie-table-header">
            <span style={{ width: '90px' }}>Poster</span>
            <span style={{ marginLeft: '45px' }}>Title</span>
            <span>Genre</span>
            <span>Type</span>
            <span>Rating</span>
            <span>Director</span>
            <span>Year</span>
            <span>Actions</span>
          </div>
  
          {loading ? (
            <p>Loading movies...</p>
          ) : (
            <>
              <section className="movie-list">
                {filteredMovies.slice(0, visibleCount).map((movie) => (
                  <div key={movie.show_id} className="movie-row">
                    <img src={movie.imageUrl} alt={movie.title} />
                    <span>{movie.title}</span>
                    <span className="icon-text"><FaFilm /> {movie.genres}</span>
                    <span className="icon-text"><FaVideo /> {movie.type}</span>
                    <span className="icon-text"><FaTag /> {movie.rating}</span>
                    <span className="icon-text"><FaUser /> {movie.director}</span>
                    <span className="icon-text"><FaCalendarAlt /> {movie.release_year}</span>
                    <span className="actions">
                      <button className="btn edit" onClick={() => handleEdit(movie.show_id)}><FaEdit /> Edit</button>
                      <button className="btn delete" onClick={() => handleDelete(movie.show_id)}><FaTrash /> Delete</button>
                    </span>
                  </div>
                ))}
              </section>
  
              {visibleCount < filteredMovies.length && (
                <div className="load-more-wrapper" style={{ textAlign: 'center', margin: '1.5rem 0' }}>
                  <button className="btn load-more" onClick={() => setVisibleCount(visibleCount + 15)}>
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
  
      {isFilterModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Filter Movies</h2>
            <div className="filter-section">
              <h3>Genres</h3>
              <div className="filter-bubbles">
                {availableGenres.map((genre) => (
                  <button
                    key={genre}
                    className={`bubble ${pendingFilters.selectedGenres.includes(genre) ? 'active' : ''}`}
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
  
              <h3>Ratings</h3>
              <div className="filter-bubbles">
                {availableRatings.map((rating) => (
                  <button
                    key={rating}
                    className={`bubble ${pendingFilters.selectedRatings.includes(rating) ? 'active' : ''}`}
                    onClick={() => toggleRating(rating)}
                  >
                    {rating}
                  </button>
                ))}
              </div>
  
              <h3>Release Year</h3>
              <div className="year-inputs">
                <input
                  type="number"
                  placeholder="Start Year"
                  value={pendingFilters.startYear || ''}
                  onChange={(e) => setPendingFilters((prev) => ({ ...prev, startYear: Number(e.target.value) }))}
                />
                <input
                  type="number"
                  placeholder="End Year"
                  value={pendingFilters.endYear || ''}
                  onChange={(e) => setPendingFilters((prev) => ({ ...prev, endYear: Number(e.target.value) }))}
                />
              </div>
  
              <div className="director-sort-row">
                <div className="input-group">
                  <h3>Director</h3>
                  <input
                    type="text"
                    placeholder="Search director..."
                    value={pendingFilters.directorInput}
                    onChange={(e) =>
                      setPendingFilters((prev) => ({
                        ...prev,
                        directorInput: e.target.value,
                      }))
                    }
                    list="director-suggestions"
                  />
                </div>
  
                <div className="input-group">
                  <h3>Sort By</h3>
                  <select
                    value={pendingFilters.sortOption}
                    onChange={(e) =>
                      setPendingFilters((prev) => ({
                        ...prev,
                        sortOption: e.target.value,
                      }))
                    }
                  >
                    <option value="none">None</option>
                    <option value="title-asc">Title A-Z</option>
                    <option value="title-desc">Title Z-A</option>
                    <option value="year-asc">Year ↑</option>
                    <option value="year-desc">Year ↓</option>
                    <option value="genre-asc">Genre A-Z</option>
                    <option value="genre-desc">Genre Z-A</option>
                  </select>
                </div>
              </div>
  
              <datalist id="director-suggestions">
                {availableDirectors
                  .filter((d) =>
                    d.toLowerCase().includes(pendingFilters.directorInput.toLowerCase())
                  )
                  .map((d) => (
                    <option key={d} value={d} />
                  ))}
              </datalist>
            </div>
  
            <div className="apply-button-wrapper">
              <button className="apply-btn" onClick={applyFilters}>Apply Filters</button>
              <button className="btn close" onClick={closeFilterModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
  
};

export default AdminPage;
