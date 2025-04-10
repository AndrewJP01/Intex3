"use client";
import React from "react";
import styles from "../pages/MovieHomePage.module.css";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/379d81dd31974d32b82392e75f008dd4ae5d5b6d" alt="Site Logo" className={styles.logo} />
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          <li>
            <a href="#" className={styles.navLink}>
              Home
            </a>
          </li>
          <li>
            <a href="#" className={styles.navLink}>
              Movies Page
            </a>
          </li>
          <li>
            <a href="#" className={styles.navLink}>
              Details
            </a>
          </li>
          <li>
            <a href="#" className={styles.navLink}>
              Privacy Policy
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.userControls}>
        <div className={styles.userProfile}>
          <svg
            width="66"
            height="66"
            viewBox="0 0 66 66"
            fill="none"
            xmlns="https://www.w3.org/2000/svg"
            className="absolute"
          >
            <path
              d="M33 60.5C48.1878 60.5 60.5 48.1878 60.5 33C60.5 17.8122 48.1878 5.5 33 5.5C17.8122 5.5 5.5 17.8122 5.5 33C5.5 48.1878 17.8122 60.5 33 60.5Z"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="https://www.w3.org/2000/svg"
            className="absolute top-[13px] left-[13px]"
          >
            <path
              d="M33.3333 35V31.6667C33.3333 29.8986 32.6309 28.2029 31.3807 26.9526C30.1304 25.7024 28.4347 25 26.6666 25H13.3333C11.5652 25 9.86949 25.7024 8.61925 26.9526C7.369 28.2029 6.66663 29.8986 6.66663 31.6667V35M26.6666 11.6667C26.6666 15.3486 23.6819 18.3333 20 18.3333C16.3181 18.3333 13.3333 15.3486 13.3333 11.6667C13.3333 7.98477 16.3181 5 20 5C23.6819 5 26.6666 7.98477 26.6666 11.6667Z"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <button className={styles.menuButton} aria-label="Menu">
          <i className={styles.menuIcon} />
        </button>
      </div>
    </header>
  );
};
