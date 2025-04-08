import './App.css'
import React from 'react';
import HomePage from './pages/HomePage';
import CreateAccount from './pages/CreateAccount';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
      </BrowserRouter>
    </>
  )
};

export default App