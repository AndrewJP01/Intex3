"use client";
import React from "react";
import styles from "../pages/MovieHomePage.module.css";
import { useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
    const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/379d81dd31974d32b82392e75f008dd4ae5d5b6d" alt="Site Logo" className={styles.logo} />
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          <li>
            <a href="#" className={styles.navLink} onClick={() => navigate("/")}>
              Home
            </a>
          </li>
          <li>
            <a href="#" className={styles.navLink} onClick={() => navigate("/MoviesPage")}>
              Movies Page
            </a>
          </li>
          <li>
            <a href="#" className={styles.navLink} onClick={() => navigate("/Details")}>
              Details
            </a>
          </li>
          <li>
            <a href="#" className={styles.navLink} onClick={() => navigate("/PrivacyPolicy")}>
              Privacy Policy
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.userProfile} onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>
            <img
                src="/profile.png"
                alt="User Profile"
                className={styles.profileIcon}
            />
            </div>

    </header>
  );
};

export default Navbar;