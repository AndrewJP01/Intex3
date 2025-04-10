import './App.css';
import { MoviesPage } from './pages/MoviesPage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import CreateAccount from './pages/CreateAccount';
import PrivacyPage from './pages/PrivacyPage';
import MovieDetails from './pages/MovieDetails';
import CookieConsent from './components/CookieConsent';
import ProtectedRoute from './components/ProtectedRoute';
import TestContextDisplay from './pages/TestContextDisplay';

function App() {
  return (
    <>
      <CookieConsent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/MoviesPage"
          element={
            <ProtectedRoute>
              <MoviesPage />
            </ProtectedRoute>
          }
        />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route
          path="/AdminPage"
          element={
            <ProtectedRoute requiredRole="Admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="/usercontexttest" element={<TestContextDisplay />} />
        <Route path="/create-account/:email" element={<CreateAccount />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/PrivacyPage" element={<PrivacyPage />} />
        <Route path="/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;
