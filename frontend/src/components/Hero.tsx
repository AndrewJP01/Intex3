"use client";
import React from "react";
import styles from "../pages/MovieHomePage.module.css";

export const Hero: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/5652da1f71f1912f5953595b1faaa106995da15e" alt="Featured Content" className={styles.heroImage} />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum
          Dolor Sit Amet Lorem Ipsum Dolor Sit Amet
        </h1>
        <div className={styles.actionButtons}>
          <button className={styles.watchButton}>Watch</button>
          <button className={styles.moreInfoButton}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c06a7e9ef3c0925a8f61258f1d7252a50a6f516" alt="Info Icon" className={styles.infoIcon} />
            <span>More Info</span>
          </button>
        </div>
      </div>
    </section>
  );
};
