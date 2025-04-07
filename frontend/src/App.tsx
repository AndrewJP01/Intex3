// src/App.tsx
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminPage from './pages/AdminPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="admin" element={<AdminPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
