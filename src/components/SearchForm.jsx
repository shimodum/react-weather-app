import { useState } from 'react';

function SearchForm({ onSearch }) {
  const [city, setCity] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!city.trim()) {
      return;
    }

    onSearch(city);
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="都市名を入力 例：Tokyo"
        value={city}
        onChange={(event) =>
          setCity(event.target.value)
        }
      />

      <button type="submit">
        検索
      </button>
    </form>
  );
}

export default SearchForm;