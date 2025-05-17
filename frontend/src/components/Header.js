import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  const [query, setQuery] = useState('');
  const [streak, setStreak] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Load streak and show notification
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

    // Review notification
    (async () => {
      if ('Notification' in window && Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return;
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
      } catch (err) {
        console.error('Reminder fetch failed:', err);
      }
    })();
  }, []);

  // Search handler
  const onSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setOpen(false);
    }
  };

  return (
    <header className="flex flex-wrap items-center justify-between p-4 shadow bg-[var(--bg)] text-[var(--text)]">
      {/* Left: Logo & Toggle */}
      <div className="flex items-center gap-3">
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open
            ? <XMarkIcon className="h-6 w-6" />
            : <Bars3Icon className="h-6 w-6" />
          }
        </button>
        <Link to="/" className="text-2xl font-bold">Lingolang</Link>
      </div>

      {/* Middle: Nav Links */}
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
            className="p-1 border border-gray-300 rounded-l text-sm bg-white dark:bg-gray-800 text-black dark:text-white"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="p-1 px-2 bg-[var(--primary)] text-white rounded-r"
          >
            🔍
          </button>
        </form>
        <div className="text-sm">🔥 {streak} day{streak !== 1 ? 's' : ''}</div>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
