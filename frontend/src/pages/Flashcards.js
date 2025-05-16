// src/pages/Flashcards.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlipCard from 'react-flip-card';

function Flashcards() {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get('/api/flashcards')
      .then(res => setCards(res.data))
      .catch(console.error);
  }, []);

  const review = async quality => {
    const card = cards[index];
    // Post quality (0‑5) to backend
    await axios.post(`/api/flashcards/${card.id}/review`, { quality });
    // Advance to next card
    setIndex(i => i + 1);
  };

  if (index >= cards.length) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>
      🎉 No more cards due today!
    </div>;
  }
  const { front, back } = cards[index];
  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <FlipCard
        front={<div style={{ padding: '2rem', border: '1px solid #ccc' }}>{front}</div>}
        back={<div style={{ padding: '2rem', border: '1px solid #ccc' }}>{back}</div>}
        style={{ cursor: 'pointer' }}
      />
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-around' }}>
        <button onClick={() => review(2)}>Again ❌</button>
        <button onClick={() => review(5)}>Good ✔️</button>
      </div>
    </div>
  );
}

export default Flashcards;
