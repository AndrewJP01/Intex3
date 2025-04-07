import React from "react";
import styles from "../pages/MovieHomePage.module.css";

type SearchBarProps = {
  searchTerm: string;
  onChange: (value: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onChange }) => {
  return (
    <input
      type="text"
      className={styles.searchBar}
      placeholder="Search for a movie title..."
      value={searchTerm}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
