import { Routes, Route } from "react-router-dom";
import { MoviesPage } from "./pages/MoviesPage";
import LoginPage from "./pages/LoginPage";
import AdminMovieManager from "./pages/AdminPage";
import PrivacyPage from "./pages/PrivacyPage";

function App() {
  return (
    <Routes>
      <Route path="/MoviesPage" element={<MoviesPage />} />
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/admin" element={<AdminMovieManager />} />
      <Route path="/PrivacyPage" element={<PrivacyPage />} />
    </Routes>
  );
}

export default App;
