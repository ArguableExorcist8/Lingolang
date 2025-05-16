// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';

import Header from './components/Header';
import DailyWord from './components/DailyWord';
import SignUp from './pages/SignUp';
import LanguageSelect from './pages/LanguageSelect';
import AddPhrase from './pages/AddPhrase';
import PhraseBank from './pages/PhraseBank';
import Quiz from './pages/Quiz';
import Flashcards from './pages/Flashcards';
import ReviewQueue from './pages/ReviewQueue';
import ChatPractice from './pages/ChatPractice';       // <-- New import
import Dictionary from './pages/Dictionary';
import SearchResults from './pages/SearchResults';
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
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/reviews" element={<ReviewQueue />} />
          <Route path="/chat" element={<ChatPractice />} />   {/* <-- New route */}
          <Route path="/dictionary/:word" element={<Dictionary />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/suggestions" element={<Suggestions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
