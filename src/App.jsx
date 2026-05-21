import { useState } from 'react';
import SearchForm from './components/SearchForm';
import WeatherCard from './components/WeatherCard';
import HistoryList from './components/HistoryList';
import { useWeather } from './hooks/useWeather';
import { useHistory } from './hooks/useHistory';
import './App.css';

function App() {
  const [city, setCity] = useState('');

  const {
    weather,
    errorMessage,
    isLoading,
    searchWeather,
    getCurrentWeather,
    setErrorMessage,
  } = useWeather();

  const {
    histories,
    addHistory,
  } = useHistory();

  async function handleSearch(cityName) {
    if (!cityName.trim()) {
      setErrorMessage('都市名を入力してください。');
      return;
    }

    const weatherData = await searchWeather(cityName);

    if (weatherData) {
      addHistory(weatherData.name);
      setCity(weatherData.name);
    }
  }

  async function handleCurrentLocation() {
    await getCurrentWeather();
  }

  function getWeatherClass(weatherMain) {
    switch (weatherMain) {
      case 'Clear':
        return 'sunny';

      case 'Clouds':
        return 'cloudy';

      case 'Rain':
        return 'rainy';

      case 'Snow':
        return 'snowy';

      default:
        return '';
    }
  }

  const weatherClass = weather
    ? getWeatherClass(weather.weather[0].main)
    : '';

  return (
    <div className={`app ${weatherClass}`}>
      <h1>天気予報アプリ</h1>

      <SearchForm
        city={city}
        setCity={setCity}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      <button
        className="location-button"
        onClick={handleCurrentLocation}
        disabled={isLoading}
      >
        {isLoading
          ? '取得中...'
          : '現在地の天気を取得'}
      </button>

      {isLoading && (
        <p>検索中...</p>
      )}

      {errorMessage && (
        <div className="weather-card">
          <p className="error">{errorMessage}</p>
        </div>
      )}

      {weather && (
        <WeatherCard weather={weather} />
      )}

      <HistoryList
        histories={histories}
        onSelectHistory={handleSearch}
      />
    </div>
  );
}

export default App;