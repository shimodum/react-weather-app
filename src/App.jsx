import { useState } from 'react';
import SearchForm from './components/SearchForm';
import WeatherCard from './components/WeatherCard';
import FavoriteButton from './components/FavoriteButton';
import ForecastList from './components/ForecastList';
import FavoriteList from './components/FavoriteList';
import HistoryList from './components/HistoryList';
import { useWeather } from './hooks/useWeather';
import { useHistory } from './hooks/useHistory';
import { useFavorites } from './hooks/useFavorites';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [isLocationSearch, setIsLocationSearch] =
    useState(false);

  const {
    weather,
    forecast,
    errorMessage,
    isLoading,
    searchWeather,
    getCurrentWeather,
    clearWeather,
  } = useWeather();

  const {
    histories,
    addHistory,
  } = useHistory();

  const {
    favorites,
    toggleFavorite,
    isFavorite,
  } = useFavorites();

  async function handleSearch(cityName) {
    if (!cityName.trim()) {
      clearWeather(
        '都市名・都道府県名・郵便番号を入力してください。'
      );
      return;
    }

    setIsLocationSearch(false);

    const weatherData = await searchWeather(cityName);

    if (weatherData) {
      addHistory(weatherData.name);
      setCity(weatherData.name);
    }
  }

  async function handleCurrentLocation() {
    setIsLocationSearch(true);
    setCity('');

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
        <WeatherCard weather={weather}>
          {!isLocationSearch && (
            <FavoriteButton
              cityName={weather.name}
              isFavorite={isFavorite(weather.name)}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </WeatherCard>
      )}

      <ForecastList forecast={forecast} />

      <FavoriteList
        favorites={favorites}
        onSelectFavorite={handleSearch}
      />

      <HistoryList
        histories={histories}
        onSelectHistory={handleSearch}
      />
    </div>
  );
}

export default App;