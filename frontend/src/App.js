// src/App.js
import React from 'react';
import DailyWord from './components/DailyWord';      // ← fixed path
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LanguageSelect from './pages/LanguageSelect';
import PhraseBank from './pages/PhraseBank';
import AddPhrase from './pages/AddPhrase';
import Quiz from './pages/Quiz';
import Flashcards from './pages/Flashcards';
import Speaking from './pages/Speaking';
import Suggestions from './pages/Suggestions';
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
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/speaking" element={<Speaking />} />
            <Route path="/suggestions" element={<Suggestions />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
