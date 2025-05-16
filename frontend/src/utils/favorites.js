// src/utils/favorites.js

/**
 * Get favorite items from localStorage.
 * @returns {string[]} Array of favorite items
 */
export function getFavs() {
  try {
    return JSON.parse(localStorage.getItem('lingolang-favorites')) || [];
  } catch (e) {
    console.error('Failed to parse favorites from localStorage:', e);
    return [];
  }
}

/**
 * Toggle a word or phrase in the favorites list.
 * Adds it if not present, removes it if already there.
 * @param {string} item - The word or phrase to toggle
 * @returns {string[]} Updated list of favorites
 */
export function toggleFav(item) {
  const favs = getFavs();
  const updated = favs.includes(item)
    ? favs.filter(i => i !== item)
    : [...favs, item];

  localStorage.setItem('lingolang-favorites', JSON.stringify(updated));
  return updated;
}
