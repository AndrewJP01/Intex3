import { useState, JSX } from "react";
import "./CategoryFilter.css";

type CategoryFilterProps = {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
    availableGenres: string[];
  };
  
  export function CategoryFilter({
    selectedCategories,
    setSelectedCategories,
    availableGenres,
  }: CategoryFilterProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleCategory = (category: string) => {
      const updated = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];
  
      setSelectedCategories(updated);
    };
  
    const handleReset = () => {
      setSelectedCategories([]);
    };
  
    return (
      <div className="category-dropdown">
        <button
          className="dropdown-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selectedCategories.length > 0
            ? `Selected: ${selectedCategories.join(", ")} ${isOpen ? "▲" : "▼"}`
            : `Filter by Category ${isOpen ? "▲" : "▼"}`}
        </button>
  
        {isOpen && (
          <div className="category-panel">
            <h4 className="filter-subtitle">Genre</h4>
            <button className="reset-button" onClick={handleReset}>
              RESET
            </button>
            <div className="tag-container">
              {availableGenres.map((genre, idx) => (
                <div
                  key={`${genre}-${idx}`}
                  className={`genre-tag ${
                    selectedCategories.includes(genre) ? "selected" : ""
                  }`}
                  onClick={() => toggleCategory(genre)}
                >
                  {genre}
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    );
  }
  
  export default CategoryFilter;