// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LanguageSelect from './pages/LanguageSelect';
import PhraseBank from './pages/PhraseBank';
import AddPhrase from './pages/AddPhrase';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/languages" element={<LanguageSelect />} />
          <Route path="/add-phrase" element={<AddPhrase />} />
          <Route path="/phrases" element={<PhraseBank />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
