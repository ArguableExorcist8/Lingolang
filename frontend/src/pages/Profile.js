import React, { useState, useEffect } from 'react';
import { getFavs } from '../utils/favorites';

function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    avatar: '',
    languages: [],
    score: 0,
  });

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('lingolang-profile'));
    if (saved) setProfile(saved);

    setFavorites(getFavs());
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleLanguagesChange = (e) => {
    const langs = e.target.value.split(',').map(l => l.trim());
    setProfile({ ...profile, languages: langs });
  };

  const saveProfile = () => {
    localStorage.setItem('lingolang-profile', JSON.stringify(profile));
    alert('Profile saved!');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>🧑‍💻 Your Profile</h2>

      <label>
        Name:
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          style={{ marginLeft: '0.5rem' }}
        />
      </label>
      <br />

      <label>
        Avatar:
        <input
          name="avatar"
          value={profile.avatar}
          onChange={handleChange}
          style={{ marginLeft: '0.5rem' }}
        />
      </label>
      <br />

      <label>
        Languages:
        <input
          name="languages"
          value={profile.languages.join(', ')}
          onChange={handleLanguagesChange}
          style={{ marginLeft: '0.5rem' }}
        />
      </label>
      <br />

      <p>Learning Score: {profile.score}</p>

      <button onClick={saveProfile}>Save Profile</button>

      <h3 style={{ marginTop: '2rem' }}>⭐ Favorites</h3>
      <ul>
        {favorites.length > 0 ? (
          favorites.map((w) => <li key={w}>{w}</li>)
        ) : (
          <li><em>None yet</em></li>
        )}
      </ul>
    </div>
  );
}

export default Profile;
