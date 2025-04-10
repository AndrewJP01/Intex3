'use client';
import React from 'react';
import styles from '../pages/MovieHomePage.module.css';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('userRole') !== null;
  const userRole = localStorage.getItem('userRole');
  const username = localStorage.getItem('username');

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/Auth/logout`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      if (!res.ok) {
        console.warn('Logout failed on backend');
      }
    } catch (err) {
      console.error('Logout error:', err);
    }

    // Clear local auth state
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');

    // Redirect user cleanly
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/379d81dd31974d32b82392e75f008dd4ae5d5b6d"
        alt="Site Logo"
        className={styles.logo}
      />

      {isLoggedIn ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {userRole === 'Admin' && (
            <>
              <button
                onClick={() => navigate('/adminPage')}
                style={{
                  padding: '6px 10px',
                  backgroundColor: '#ff9800',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                }}
              >
                Admin View
              </button>
              <button
                onClick={() => navigate('/moviesPage')}
                style={{
                  padding: '6px 10px',
                  backgroundColor: '#2196f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                }}
              >
                User View
              </button>
            </>
          )}
          <span
            style={{
              color: '#fff',
              fontFamily: 'sans-serif',
              fontSize: '0.9rem',
            }}
          >
            Welcome, {username}
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: '6px 12px',
              backgroundColor: '#f44336',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            Logout
          </button>
        </div>
      ) : (
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
      )}
    </header>
  );
};
