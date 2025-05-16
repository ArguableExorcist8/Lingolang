// src/components/ThemeSwitcher.js
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, toggleTheme, fontSize, setFontSize } = useContext(ThemeContext);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <button onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <label>
        Font:
        <select
          value={fontSize}
          onChange={e => setFontSize(e.target.value)}
          style={{ marginLeft: '0.25rem' }}
        >
          <option value="sm">Small</option>
          <option value="base">Normal</option>
          <option value="lg">Large</option>
        </select>
      </label>
    </div>
  );
}
