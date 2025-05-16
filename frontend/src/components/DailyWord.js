// src/components/DailyWord.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DailyWord() {
  const [word, setWord] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // YYYY‑MM‑DD
    const stored = JSON.parse(localStorage.getItem('dailyWord'));

    if (stored?.date === today) {
      setWord(stored.word);
    } else {
      axios.get('/api/phrases')
        .then(res => {
          const phrases = res.data;
          if (phrases.length === 0) return;
          const idx = Math.floor(Math.random() * phrases.length);
          const pick = phrases[idx];
          const payload = { date: today, word: pick };
          localStorage.setItem('dailyWord', JSON.stringify(payload));
          setWord(pick);
        })
        .catch(console.error);
    }
  }, []);

  if (!word) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, width: '100%',
      background: '#007bff', color: 'white',
      padding: '0.5rem', textAlign: 'center', fontFamily: 'sans-serif'
    }}>
      <strong>Daily Word:</strong> {word.language} – {word.text}
      {word.image && (
        <img
          src={`/uploads/${word.image}`}
          alt=""
          style={{ height: 40, marginLeft: '1rem', verticalAlign: 'middle' }}
        />
      )}
    </div>
  );
}

export default DailyWord;
