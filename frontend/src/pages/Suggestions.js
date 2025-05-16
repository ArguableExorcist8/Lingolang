import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');

  const fetchSuggestions = () => {
    axios.get('/api/suggestions').then(res => setSuggestions(res.data));
  };

  const submitSuggestion = async () => {
    if (!input.trim()) return;
    await axios.post('/api/suggestions', {
      author: name || 'Anonymous',
      suggestion: input
    });
    setInput('');
    fetchSuggestions();
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>💡 Suggest Learning Materials</h2>
      <input
        type="text"
        placeholder="Your name (optional)"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ marginBottom: '0.5rem' }}
      />
      <textarea
        rows={3}
        value={input}
        placeholder="Suggest new phrases, topics, or improvements..."
        onChange={e => setInput(e.target.value)}
        style={{ width: '100%', marginBottom: '0.5rem' }}
      />
      <button onClick={submitSuggestion}>Submit</button>
      <h3>📋 Suggestions:</h3>
      <ul>
        {suggestions.map(s => (
          <li key={s.id}>
            <strong>{s.author}</strong>: {s.suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestions;
