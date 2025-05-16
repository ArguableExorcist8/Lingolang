// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  const [query, setQuery] = useState('');
  const [streak, setStreak] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Load & update streak + send review notification
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const { lastDate, count } = JSON.parse(localStorage.getItem('lingolang-streak') || '{}');
    if (lastDate === today) {
      setStreak(count);
    } else {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const newCount = lastDate === yesterday ? count + 1 : 1;
      localStorage.setItem('lingolang-streak', JSON.stringify({ lastDate: today, count: newCount }));
      setStreak(newCount);
    }

    (async () => {
      if ('Notification' in window && Notification.permission !== 'denied') {
        const perm = await Notification.requestPermission();
        if (perm !== 'granted') return;
      }
      try {
        const res = await fetch('/api/flashcards');
        const due = await res.json();
        if (due.length > 0) {
          new Notification('Lingolang Review Reminder', {
            body: `You have ${due.length} card${due.length > 1 ? 's' : ''} to review today!`,
            icon: '/favicon.ico'
          });
        }
      } catch (e) {
        console.error('Reminder fetch failed', e);
      }
    })();
  }, []);

  const onSearch = e => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setOpen(false);
    }
  };

  return (
    <header className="flex items-center justify-between flex-wrap p-4 bg-background-light dark:bg-background-dark shadow-sm font-sans">
      {/* Left: Logo & Hamburger */}
      <div className="flex items-center gap-3">
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
        <Link to="/" className="font-bold text-xl text-primary-dark dark:text-primary-light">
          Lingolang
        </Link>
      </div>

      {/* Middle: Nav */}
      <nav className={`w-full md:flex md:items-center md:gap-6 md:w-auto ${open ? 'block' : 'hidden'}`}>
        <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
          <Link to="/profile">👤 Profile</Link>
          <Link to="/flashcards">🃏 Flashcards</Link>
          <Link to="/phrases">📝 Phrasebank</Link>
          <Link to="/suggestions">💡 Suggestions</Link>
          <Link to="/chat">💬 Practice</Link>
          <Link to="/reviews">🕒 Reviews</Link>
        </div>
      </nav>

      {/* Right: Search, Streak, Theme */}
      <div className="flex items-center gap-3 mt-4 md:mt-0">
        <form onSubmit={onSearch} className="flex">
          <input
            className="p-1 border rounded-l text-sm bg-white dark:bg-gray-800 text-black dark:text-white"
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="p-1 bg-primary-light dark:bg-primary rounded-r text-white">🔍</button>
        </form>
        <div className="text-sm">🔥 {streak} day{streak !== 1 ? 's' : ''}</div>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
