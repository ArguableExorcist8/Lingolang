import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';

import Header from './components/Header';
import DailyWord from './components/DailyWord';
import SignUp from './pages/SignUp';
import LanguageSelect from './pages/LanguageSelect';
import PhraseBank from './pages/PhraseBank';
import AddPhrase from './pages/AddPhrase';
import Quiz from './pages/Quiz';
import ReviewQueue from './pages/ReviewQueue';
import Dictionary from './pages/Dictionary';
import SearchResults from './pages/SearchResults';
import Flashcards from './pages/Flashcards';
import Profile from './pages/Profile';
import Speaking from './pages/Speaking';
import Suggestions from './pages/Suggestions';

import './App.css';

function App() {
  const { theme, fontSize } = useContext(ThemeContext);

  return (
    <div className={`${theme} text-${fontSize}`}>
      <DailyWord />
      <BrowserRouter>
        <Header />
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
          <Route path="/reviews" element={<ReviewQueue />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
