// src/App.js
import React from 'react';
import DailyWord from '../../mobile/components/DailyWord';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LanguageSelect from './pages/LanguageSelect';
import PhraseBank from './pages/PhraseBank';
import AddPhrase from './pages/AddPhrase';
import Flashcards from './pages/Flashcards';
import Suggestions from './pages/Suggestions'; // ✅ Imported Suggestions
import './App.css';

function App() {
  return (
    <>
      <DailyWord />
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/languages" element={<LanguageSelect />} />
            <Route path="/add-phrase" element={<AddPhrase />} />
            <Route path="/phrases" element={<PhraseBank />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/suggestions" element={<Suggestions />} /> {/* ✅ New route */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
