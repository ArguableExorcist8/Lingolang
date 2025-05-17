// src/pages/Flashcards.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactCardFlip from 'react-card-flip';
import { toggleFav, getFavs } from '../utils/favorites';

function Flashcards() {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [context, setContext] = useState('');

  useEffect(() => {
    axios.get('/api/flashcards')
      .then(res => setCards(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    // Reset context when moving to a new card
    setContext('');
  }, [index]);

  useEffect(() => {
    // Fetch context sentence when card is flipped to the back
    const card = cards[index];
    if (isFlipped && card) {
      axios.post('/api/flashcards/context', {
        word: card.front,
        language: card.back // Assuming "back" contains language name or code
      })
      .then(res => setContext(res.data.sentence))
      .catch(console.error);
    }
  }, [isFlipped, index, cards]);

  const review = async (quality) => {
    const card = cards[index];
    await axios.post(`/api/flashcards/${card.id}/review`, { quality });
    setIsFlipped(false);
    setIndex(i => i + 1);
  };

  const currentCard = cards[index];
  if (!currentCard) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        🎉 No more cards due today!
      </div>
    );
  }

  const { front, back } = currentCard;
  const isFav = front && getFavs().includes(front);

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif', position: 'relative' }}>
      {/* Favorite star */}
      <button
        onClick={() => toggleFav(front)}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer'
        }}
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFav ? '★' : '☆'}
      </button>

      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* Front */}
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

        {/* Back */}
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
          <div style={{ marginBottom: '1rem' }}>{back}</div>
          <div style={{ fontStyle: 'italic', color: '#007700' }}>
            {context || 'Generating context…'}
          </div>
        </div>
      </ReactCardFlip>

      {/* Review Buttons */}
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-around' }}>
        <button onClick={() => review(2)}>Again ❌</button>
        <button onClick={() => review(5)}>Good ✔️</button>
      </div>
    </div>
  );
}

export default Flashcards;
