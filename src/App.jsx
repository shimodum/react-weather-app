import { useState } from 'react';
import SearchForm from './components/SearchForm';
import {
  fetchWeatherByCity,
  fetchWeatherByLocation,
} from './api/weatherApi';
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

  function handleCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          setErrorMessage('');
          setIsLoading(true);

          const weatherData = await fetchWeatherByLocation(
            position.coords.latitude,
            position.coords.longitude
          );

          setWeather(weatherData);
        } catch (error) {
          setWeather(null);
          setErrorMessage(error.message);
        } finally {
          setIsLoading(false);
        }
      },
      () => {
        setErrorMessage('位置情報取得が許可されませんでした');
      }
    );
  }

  return (
    <div className="app">
      <h1>天気予報アプリ</h1>

      <SearchForm onSearch={handleSearch} />

      <button onClick={handleCurrentLocation}>
        現在地の天気を取得
      </button>

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