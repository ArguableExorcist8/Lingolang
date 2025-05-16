import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get('query') || '';
  const [results, setResults] = useState({ phrases:[], flashcards:[] });

  useEffect(() => {
    if (!query) return;
    axios.get(`/api/search?query=${encodeURIComponent(query)}`)
      .then(res => setResults(res.data))
      .catch(console.error);
  }, [query]);

  return (
    <div style={{ padding:'2rem', fontFamily:'sans-serif' }}>
      <h2>Search: “{query}”</h2>
      <h3>Phrases</h3>
      <ul>
        {results.phrases.map(p => (
          <li key={p.id}>
            <Link to={`/dictionary/${encodeURIComponent(p.text)}`}>{p.text}</Link>
          </li>
        ))}
        {results.phrases.length===0 && <li><em>No matches</em></li>}
      </ul>
      <h3>Flashcards</h3>
      <ul>
        {results.flashcards.map(f => (
          <li key={f.id}>
            <Link to={`/dictionary/${encodeURIComponent(f.front)}`}>{f.front}</Link>
          </li>
        ))}
        {results.flashcards.length===0 && <li><em>No matches</em></li>}
      </ul>
    </div>
  );
}
