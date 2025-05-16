import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Dictionary() {
  const { word } = useParams();
  const [usages, setUsages] = useState([]);

  useEffect(() => {
    axios.get(`/api/search?query=${encodeURIComponent(word)}`)
      .then(res => {
        // combine phrase & flashcard usages
        const combined = [
          ...res.data.phrases.map(p=>({ type:'Phrase', text:p.text, lang:p.language })),
          ...res.data.flashcards.map(f=>({ type:'Flashcard', text:f.front, lang:'Unknown' }))
        ];
        setUsages(combined);
      })
      .catch(console.error);
  }, [word]);

  return (
    <div style={{ padding:'2rem', fontFamily:'sans-serif' }}>
      <h2>🔍 {decodeURIComponent(word)} – Dictionary</h2>
      <h3>Usages</h3>
      <ul>
        {usages.map((u,i)=>(
          <li key={i}>
            <strong>{u.type}</strong> [{u.lang}]: {u.text}
          </li>
        ))}
        {usages.length===0 && <li><em>No usages found.</em></li>}
      </ul>
      {/* Later: show definitions, audio, etc. */}
    </div>
  );
}
