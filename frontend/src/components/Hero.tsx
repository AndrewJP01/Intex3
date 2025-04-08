"use client";
import React from "react";
import styles from "../pages/MovieHomePage.module.css";

type HeroProps = {
    featuredMovie: {
      title: string;
      description?: string;
      imageUrl: string;
    };
  };
  
  export const Hero: React.FC<HeroProps> = ({ featuredMovie }) => {
    return (
        <>
      <section className={styles.heroSection}>
        <img
          src={featuredMovie.imageUrl}
          alt={featuredMovie.title}
          className={styles.heroImage}
        />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{featuredMovie.title}</h1>
          <p className={styles.heroDescription}>{featuredMovie.description}</p>
          <div className={styles.actionButtons}>
            <button className={styles.watchButton}>Watch</button>
            <button className={styles.moreInfoButton}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c06a7e9ef3c0925a8f61258f1d7252a50a6f516"
                alt="Info Icon"
                className={styles.infoIcon}
              />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </section>
  
      <div className={styles.content}>
        <h2>Movie List</h2>
        {/* Your movie list content goes here */}
      </div>
      </>
    );
  };
  