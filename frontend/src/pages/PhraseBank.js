// src/pages/PhraseBank.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PhraseBank() {
  const [phrases, setPhrases] = useState([]);

  useEffect(() => {
    axios.get('/api/phrases')
      .then(res => setPhrases(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Phrasebank</h2>
      {phrases.map(p => (
        <div key={p.id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
          <strong>{p.language}:</strong> {p.text}
          {p.image && (
            <div><img src={`/uploads/${p.image}`} alt="" style={{ maxWidth: '100%', marginTop: '0.5rem' }}/></div>
          )}
          {p.audio && (
            <div style={{ marginTop: '0.5rem' }}>
              <audio controls src={`/uploads/${p.audio}`}/>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PhraseBank;
