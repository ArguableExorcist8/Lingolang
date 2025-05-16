// src/App.js
import React from 'react';
import DailyWord from './components/DailyWord';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LanguageSelect from './pages/LanguageSelect';
import PhraseBank from './pages/PhraseBank';
import AddPhrase from './pages/AddPhrase';
import Quiz from './pages/Quiz';
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
          {/* Example header with a Profile link */}
          <header style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
            <Link to="/profile" style={{ textDecoration: 'none', fontSize: '1.2rem' }}>
              👤 Profile
            </Link>
          </header>

          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/languages" element={<LanguageSelect />} />
            <Route path="/add-phrase" element={<AddPhrase />} />
            <Route path="/phrases" element={<PhraseBank />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/profile" element={<Profile />} />          {/* Profile route */}
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

