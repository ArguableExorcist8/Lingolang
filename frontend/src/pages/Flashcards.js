// src/pages/Flashcards.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactCardFlip from 'react-card-flip';

function Flashcards() {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    axios.get('/api/flashcards')
      .then(res => setCards(res.data))
      .catch(console.error);
  }, []);

  const review = async (quality) => {
    const card = cards[index];
    await axios.post(`/api/flashcards/${card.id}/review`, { quality });
    setIsFlipped(false);
    setIndex(i => i + 1);
  };

  if (index >= cards.length) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        🎉 No more cards due today!
      </div>
    );
  }

  const { front, back } = cards[index];

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div
          key="front"
          onClick={() => setIsFlipped(true)}
          style={{
            padding: '2rem',
            border: '1px solid #ccc',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          {front}
        </div>

        <div
          key="back"
          onClick={() => setIsFlipped(false)}
          style={{
            padding: '2rem',
            border: '1px solid #ccc',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          {back}
        </div>
      </ReactCardFlip>

      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-around' }}>
        <button onClick={() => review(2)}>Again ❌</button>
        <button onClick={() => review(5)}>Good ✔️</button>
      </div>
    </div>
  );
}

export default Flashcards;
