import { useEffect, useState } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites =
      localStorage.getItem('weatherFavorites');

    return savedFavorites
      ? JSON.parse(savedFavorites)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      'weatherFavorites',
      JSON.stringify(favorites)
    );
  }, [favorites]);

  function toggleFavorite(cityName) {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(cityName)) {
        return prevFavorites.filter(
          (favorite) => favorite !== cityName
        );
      }

      return [cityName, ...prevFavorites].slice(0, 5);
    });
  }

  function isFavorite(cityName) {
    return favorites.includes(cityName);
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}