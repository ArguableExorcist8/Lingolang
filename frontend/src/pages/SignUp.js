// src/pages/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

const handleSubmit = async e => {
  e.preventDefault();
  try {
    const res = await axios.post('/api/signup', { name, email });
    console.log('Signup response:', res.data);
    
    // ✅ Save user to localStorage for use in LanguageSelect
    localStorage.setItem('lastSignup', JSON.stringify(res.data));
    
    navigate('/languages');
  } catch (err) {
    console.error('Signup error', err.response || err);
    alert('Signup failed – check console for details.');
  }
};


  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Welcome to Lingolang</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{ width: '100%', margin: '0.5rem 0' }}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', margin: '0.5rem 0' }}
          />
        </label>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
