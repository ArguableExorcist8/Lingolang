import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  const [query, setQuery] = useState('');
  const [streak, setStreak] = useState(0);
  const navigate = useNavigate();

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
    if (query.trim()) navigate(`/search?query=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header style={{
      display: 'flex', alignItems: 'center', padding: '0.5rem 1rem',
      background: '#f5f5f5', gap: '1rem', fontFamily: 'sans-serif'
    }}>
      <Link to="/">🏠 Home</Link>
      <Link to="/profile">👤 Profile</Link>
      <Link to="/flashcards">🃏 Flashcards</Link>
      <Link to="/phrases">📝 Phrasebank</Link>
      <Link to="/suggestions">💡 Suggestions</Link>
      <form onSubmit={onSearch} style={{ marginLeft: 'auto' }}>
        <input
          type="text" placeholder="Search words..."
          value={query} onChange={e => setQuery(e.target.value)}
          style={{ padding: '0.25rem', width: '150px' }}
        />
        <button type="submit">🔍</button>
      </form>
      <div>🔥 Streak: {streak} day{streak > 1 ? 's' : ''}</div>
      <ThemeSwitcher />
    </header>
  );
}
