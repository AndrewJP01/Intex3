import { useState, useEffect } from "react";
import './CategoryFilter.css';

type CategoryFilterProps = {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
};

export function CategoryFilter({ selectedCategories, setSelectedCategories }: CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const staticCategories = [
      "Action", "Adventure", "Anime Series International TV Shows",
      "British TV Shows Docuseries International TV Shows", "Children",
      "Comedies", "Comedies Dramas International Movies", "Comedies International Movies",
      "Comedies Romantic Movies", "Crime TV Shows Docuseries", "Documentaries",
      "Documentaries International Movies", "Docuseries", "Dramas",
      "Dramas International Movies", "Dramas Romantic Movies", "Family Movies",
      "Fantasy", "Horror Movies", "International Movies Thrillers",
      "International TV Shows Romantic TV Shows TV Dramas", "Kids' TV",
      "Language TV Shows", "Musicals", "Nature TV", "Reality TV", "Spirituality",
      "TV Action", "TV Comedies", "TV Dramas", "Talk Shows TV Comedies", "Thrillers"
    ];

    setCategories(staticCategories);
  }, []);

  const handleCheckboxChange = ({ target }: { target: HTMLInputElement }) => {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((c) => c !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
  };

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="category-filter">
      <button
        className="dropdown-toggle"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        Filter by Category {isDropdownOpen ? "▲" : "▼"}
      </button>

      {isDropdownOpen && (
        <div className="dropdown-menu">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div key={category} className="category-item">
                <input
                  type="checkbox"
                  id={category}
                  value={category}
                  className="category-checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            ))
          ) : (
            <div className="no-results">No categories found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default CategoryFilter;
