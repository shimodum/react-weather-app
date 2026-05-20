import { useEffect, useState } from 'react';
import SearchForm from './components/SearchForm';
import WeatherCard from './components/WeatherCard';
import HistoryList from './components/HistoryList';
import { useWeather } from './hooks/useWeather';
import './App.css';

function App() {
  const {
    weather,
    errorMessage,
    isLoading,
    searchWeather,
    getCurrentWeather,
  } = useWeather();

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

  async function handleSearch(city) {
    const weatherData = await searchWeather(city);

    if (weatherData) {
      addHistory(weatherData.name);
    }
  }

  async function handleCurrentLocation() {
    const weatherData = await getCurrentWeather();

    if (weatherData) {
      addHistory(weatherData.name);
    }
  }

  function addHistory(cityName) {
    setHistories((prevHistories) => {
      const newHistories = prevHistories.filter(
        (history) => history !== cityName
      );

      return [cityName, ...newHistories].slice(0, 5);
    });
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

      <HistoryList
        histories={histories}
        onSelectHistory={handleSearch}
      />
    </div>
  );
}

export default App;