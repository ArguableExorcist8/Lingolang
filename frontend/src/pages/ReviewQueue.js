// src/pages/ReviewQueue.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReviewQueue() {
  const [due, setDue] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const fetchLists = async () => {
    try {
      const [dueRes, upRes] = await Promise.all([
        axios.get('/api/flashcards'),         // due today
        axios.get('/api/flashcards/upcoming'), // future
      ]);
      setDue(dueRes.data);
      setUpcoming(upRes.data);
    } catch (err) {
      console.error('Failed fetching review lists:', err);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const reviewNow = async (id, quality) => {
    try {
      await axios.post(`/api/flashcards/${id}/review`, { quality });
      fetchLists(); // refresh lists
    } catch (err) {
      console.error('Review failed:', err);
    }
  };

  const formatDate = iso => {
    const dt = new Date(iso);
    return dt.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>🕒 Review Queue</h2>

      <section>
        <h3>Due for Review Today</h3>
        {due.length === 0 && <p>No cards due. Great job!</p>}
        {due.map(c => (
          <div
            key={c.id}
            style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}
          >
            <p><strong>Front:</strong> {c.front}</p>
            <p><strong>Back:</strong>  {c.back}</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => reviewNow(c.id, 2)}>Again ❌</button>
              <button onClick={() => reviewNow(c.id, 5)}>Good ✔️</button>
            </div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h3>Upcoming Reviews</h3>
        {upcoming.length === 0 && <p>No upcoming reviews.</p>}
        {upcoming.map(c => (
          <div key={c.id} style={{ marginBottom: '0.5rem' }}>
            <span>{c.front}</span>
            <em style={{ marginLeft: '1rem', color: '#555' }}>
              {formatDate(c.nextReview)}
            </em>
          </div>
        ))}
      </section>
    </div>
  );
}
