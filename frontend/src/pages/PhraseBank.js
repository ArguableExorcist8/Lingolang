// src/pages/PhraseBank.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toggleFav, getFavs } from '../utils/favorites';

function PhraseBank() {
  const [phrases, setPhrases] = useState([]);

  useEffect(() => {
    axios.get('/api/phrases')
      .then(res => {
        console.log('Phrase API response:', res.data);
        // Ensure we always work with an array
        const list = Array.isArray(res.data)
          ? res.data
          : (Array.isArray(res.data.phrases) ? res.data.phrases : []);
        setPhrases(list);
      })
      .catch(err => {
        console.error('Error fetching phrases:', err);
        setPhrases([]); // fallback
      });
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Phrasebank</h2>
      {phrases.length > 0 ? (
        phrases.map(p => {
          const isFav = getFavs().includes(p.text);
          return (
            <div
              key={p.id}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                margin: '1rem 0',
                position: 'relative'
              }}
            >
              <button
                onClick={() => toggleFav(p.text)}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  background: 'none',
                  border: 'none',
                  fontSize: '1.2rem',
                  cursor: 'pointer'
                }}
                aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFav ? '★' : '☆'}
              </button>

              <strong>{p.language}:</strong> {p.text}

              {p.image && (
                <div>
                  <img
                    src={`/uploads/${p.image}`}
                    alt=""
                    style={{ maxWidth: '100%', marginTop: '0.5rem' }}
                  />
                </div>
              )}

              {p.audio && (
                <div style={{ marginTop: '0.5rem' }}>
                  <audio controls src={`/uploads/${p.audio}`} />
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No phrases available.</p>
      )}
    </div>
  );
}

export default PhraseBank;
