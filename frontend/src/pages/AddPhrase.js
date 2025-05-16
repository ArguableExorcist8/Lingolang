// src/pages/AddPhrase.js
import React, { useState } from 'react';
import axios from 'axios';

function AddPhrase() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('');
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = new FormData();
    form.append('text', text);
    form.append('language', language);
    if (image) form.append('image', image);
    if (audio) form.append('audio', audio);

    try {
      const res = await axios.post('/api/phrases', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Phrase added!');
      setText(''); setLanguage(''); setImage(null); setAudio(null);
    } catch (err) {
      console.error(err.response || err);
      alert('Failed to add phrase.');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Add a New Phrase</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Phrase Text:
          <input
            type="text" value={text}
            onChange={e => setText(e.target.value)} required
            style={{ width: '100%', margin: '0.5rem 0' }}
          />
        </label>
        <label>
          Language:
          <input
            type="text" value={language}
            onChange={e => setLanguage(e.target.value)} required
            placeholder="e.g. Swahili" style={{ width: '100%', margin: '0.5rem 0' }}
          />
        </label>
        <label>
          Image:
          <input
            type="file" accept="image/*"
            onChange={e => setImage(e.target.files[0])}
            style={{ display: 'block', margin: '0.5rem 0' }}
          />
        </label>
        <label>
          Audio:
          <input
            type="file" accept="audio/*"
            onChange={e => setAudio(e.target.files[0])}
            style={{ display: 'block', margin: '0.5rem 0' }}
          />
        </label>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Submit Phrase
        </button>
      </form>
    </div>
  );
}

export default AddPhrase;
