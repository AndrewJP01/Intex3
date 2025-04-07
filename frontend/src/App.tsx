
import './App.css'
import { MoviesPage } from './pages/MoviesPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'

function App() {


  return (
    <>
      <BrowserRouter>  
      <Routes>
        <Route path="/MoviesPage" element={<MoviesPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
      </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
