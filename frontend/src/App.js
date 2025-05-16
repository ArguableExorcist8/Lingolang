// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LanguageSelect from './pages/LanguageSelect';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/languages" element={<LanguageSelect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
