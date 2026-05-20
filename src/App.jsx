import { useState } from 'react';
import SearchForm from './components/SearchForm';
import { fetchWeatherByCity } from './api/weatherApi';
import WeatherCard from './components/WeatherCard';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch(city) {
    try {
      setErrorMessage('');
      setIsLoading(true);

      const weatherData = await fetchWeatherByCity(city);

      setWeather(weatherData);
    } catch (error) {
      setWeather(null);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app">
      <h1>天気予報アプリ</h1>

      <SearchForm onSearch={handleSearch} />

      {isLoading && (
        <p>検索中...</p>
      )}

      {errorMessage && (
        <p className="error">{errorMessage}</p>
      )}

      {weather && (
        <WeatherCard weather={weather} />
      )}
    </div>
  );
}

export default App;