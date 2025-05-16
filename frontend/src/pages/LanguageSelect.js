// src/pages/LanguageSelect.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const continents = {
  Africa: ['Swahili', 'Hausa', 'Amharic', 'Igbo', 'Xhosa'],
  Asia:   ['Balochi', 'Khmer', 'Lao', 'Uzbek', 'Tibetan'],
  Europe: ['Basque', 'Breton', 'Romani', 'Sami', 'Galician'],
  Americas: ['Quechua', 'Guarani', 'Nahua', 'Aymara', 'Cree'],
  Oceania: ['Maori', 'Samoan', 'Fijian', 'Tongan', 'Hiri Motu']
};

function LanguageSelect() {
  const [selected, setSelected] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('lastSignup'));
    if (saved && saved.user && saved.user.id) {
      setUserId(saved.user.id);
    }
  }, []);

  const toggle = lang => {
    setSelected(prev =>
      prev.includes(lang)
        ? prev.filter(l => l !== lang)
        : [...prev, lang]
    );
  };

  const handleNext = async () => {
    if (!userId) return alert('No user ID—please sign up first.');
    try {
      const res = await axios.post('/api/languages', {
        userId,
        languages: selected
      });
      console.log('Languages saved:', res.data);
      alert('Languages saved successfully!');
    } catch (err) {
      console.error(err.response || err);
      alert('Failed to save languages.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Select Your Languages</h2>
      {Object.entries(continents).map(([cont, langs]) => (
        <div key={cont} style={{ margin: '1rem 0' }}>
          <h3>{cont}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {langs.map(lang => (
              <button
                key={lang}
                onClick={() => toggle(lang)}
                style={{
                  padding: '0.5rem 1rem',
                  border: selected.includes(lang) ? '2px solid #007bff' : '1px solid #ccc',
                  background: 'white',
                  cursor: 'pointer'
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleNext} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
        Continue
      </button>
    </div>
  );
}

export default LanguageSelect;
