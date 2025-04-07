"use client";
import React, { useState } from "react";
import styles from "./MovieHomePage.module.css";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ContentCarousel } from "../components/ContentCarousel";
import { SearchBar } from "../components/SearchBar";
import { CategoryFilter } from "../components/CategoryFilter";
import { useMovieData } from "../api/useMovieData";
import { NavBar } from "../components/NavBar";

export const MoviesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { groupedByCategory } = useMovieData(searchTerm, selectedCategories);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <main className={styles.mainContainer}>
        <NavBar />
        <Hero />
        <SearchBar searchTerm={searchTerm} onChange={setSearchTerm} />
        <CategoryFilter
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        {Object.entries(groupedByCategory).map(([category, movies]) => (
          <ContentCarousel key={category} title={category} movies={movies} />
        ))}
      </main>
    </>
  );
};
