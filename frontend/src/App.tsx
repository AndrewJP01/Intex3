
import './App.css'
import { MoviesPage } from './pages/MoviesPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import AdminMovieManager from './pages/test'
import HomePage from './pages/HomePage';
import CreateAccount from './pages/CreateAccount';

function App() {


  return (
    <>
      <BrowserRouter>  
      <Routes>
        <Route path="/MoviesPage" element={<MoviesPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/AdminMovieManager" element={<AdminMovieManager />} />

      </Routes>

      </BrowserRouter>

    </>
  )
};

export default App;
