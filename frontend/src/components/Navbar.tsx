'use client';
import React from 'react';
import styles from '../pages/MovieHomePage.module.css';
import { useNavigate } from 'react-router-dom';
export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/379d81dd31974d32b82392e75f008dd4ae5d5b6d"
        alt="Site Logo"
        className={styles.logo}
      />

      <div
        onClick={() => navigate('/loginPage')}
        style={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: '#fff',
          fontFamily: 'sans-serif',
          fontSize: '0.85rem',
        }}
      >
        <img
          src="/profile.png"
          alt="User Profile"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            marginBottom: '4px',
          }}
        />
        <span style={{ fontWeight: '500' }}>Sign In</span>
      </div>
    </header>
  );
};
