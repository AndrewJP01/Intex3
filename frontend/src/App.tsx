
import './App.css'
import { MoviesPage } from './pages/MoviesPage'
import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import CreateAccount from './pages/CreateAccount';
import PrivacyPage from './pages/PrivacyPage';

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/MoviesPage" element={<MoviesPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/create-account/:email" element={<CreateAccount />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/PrivacyPage" element={<PrivacyPage />} />



      </Routes>


    </>
  )
};

export default App;
