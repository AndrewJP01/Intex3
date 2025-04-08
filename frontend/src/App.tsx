
import './App.css'
import { MoviesPage } from './pages/MoviesPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage';

function App() {


  return (
    <>
      <BrowserRouter>  
      <Routes>
        <Route path="/MoviesPage" element={<MoviesPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Admin" element={<AdminPage />} />


      </Routes>

      </BrowserRouter>

    </>
  )
};

export default App;
