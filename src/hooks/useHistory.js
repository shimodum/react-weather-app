import { useEffect, useState } from 'react';

export function useHistory() {
  const [histories, setHistories] = useState(() => {
    const savedHistories =
      localStorage.getItem('weatherHistories');

    return savedHistories
      ? JSON.parse(savedHistories)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      'weatherHistories',
      JSON.stringify(histories)
    );
  }, [histories]);

  function addHistory(cityName) {
    setHistories((prevHistories) => {
      const newHistories = prevHistories.filter(
        (history) => history !== cityName
      );

      return [cityName, ...newHistories].slice(0, 5);
    });
  }

  return {
    histories,
    addHistory,
  };
}