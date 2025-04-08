import React from "react";
import styles from "../pages/MovieHomePage.module.css";
import { FaSearch } from "react-icons/fa";  // Import FontAwesome icon

type SearchBarProps = {
  searchTerm: string;
  onChange: (value: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onChange }) => {
  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        className={styles.searchBar}
        placeholder="Search for a movie title..."
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
      />
      <FaSearch className={styles.searchIcon} />
    </div>
  );
};
