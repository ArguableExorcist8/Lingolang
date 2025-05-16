import React, { useState, useEffect } from 'react';

function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    avatar: '',
    languages: [],
    score: 0,
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('lingolang-profile'));
    if (saved) setProfile(saved);
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    localStorage.setItem('lingolang-profile', JSON.stringify(profile));
    alert('Profile saved!');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧑‍💻 Your Profile</h2>
      <label>Name: <input name="name" value={profile.name} onChange={handleChange} /></label><br />
      <label>Avatar: <input name="avatar" value={profile.avatar} onChange={handleChange} /></label><br />
      <label>Languages: <input name="languages" value={profile.languages} onChange={(e) => setProfile({...profile, languages: e.target.value.split(',')})} /></label><br />
      <p>Learning Score: {profile.score}</p>
      <button onClick={saveProfile}>Save Profile</button>
    </div>
  );
}

export default Profile;
