import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <header
        style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: '1.5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>🎬 Cineniche</div>
          <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '1rem' }}>
            <Link to="/">Home</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </nav>
        </div>
        <div>👤</div>
      </header>

      <main style={{ width: '100%' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; // ✅ Add this default export
