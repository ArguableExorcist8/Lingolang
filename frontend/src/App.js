// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import DailyWord from './components/DailyWord';
import SignUp from './pages/SignUp';
import LanguageSelect from './pages/LanguageSelect';
import PhraseBank from './pages/PhraseBank';
import AddPhrase from './pages/AddPhrase';
import Quiz from './pages/Quiz';
import Dictionary from './pages/Dictionary';
import SearchResults from './pages/SearchResults';
import Flashcards from './pages/Flashcards';
import Profile from './pages/Profile';
import Speaking from './pages/Speaking';
import Suggestions from './pages/Suggestions';

import './App.css';

function App() {
  return (
    <>
      <DailyWord />
      <div className="App">
        <BrowserRouter>
          {/* Top navigation header */}
          <header style={{ padding: '1rem', borderBottom: '1px solid #ddd', marginBottom: '1rem' }}>
            <nav style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/profile" style={{ textDecoration: 'none' }}>👤 Profile</Link>
              <Link to="/flashcards" style={{ textDecoration: 'none' }}>🃏 Flashcards</Link>
              <Link to="/phrases" style={{ textDecoration: 'none' }}>📚 Phrase Bank</Link>
              <Link to="/quiz" style={{ textDecoration: 'none' }}>🧠 Quiz</Link>
            </nav>
          </header>

          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/languages" element={<LanguageSelect />} />
            <Route path="/add-phrase" element={<AddPhrase />} />
            <Route path="/phrases" element={<PhraseBank />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/dictionary/:word" element={<Dictionary />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/profile" element={<Profile />} />
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
