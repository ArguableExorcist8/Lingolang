// src/context/ThemeContext.js
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  fontSize: 'base',
  toggleTheme: () => {},
  setFontSize: () => {}
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem('lingolang-theme') || 'light'
  );
  const [fontSize, setFontSizeState] = useState(
    localStorage.getItem('lingolang-fontSize') || 'base'
  );

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('lingolang-theme', next);
  };

  const setFontSize = (size) => {
    setFontSizeState(size);
    localStorage.setItem('lingolang-fontSize', size);
  };

  return (
    <ThemeContext.Provider value={{ theme, fontSize, toggleTheme, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
}
