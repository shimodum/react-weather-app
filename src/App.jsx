import SearchForm from './components/SearchForm';
import WeatherCard from './components/WeatherCard';
import HistoryList from './components/HistoryList';
import { useWeather } from './hooks/useWeather';
import { useHistory } from './hooks/useHistory';
import './App.css';

function App() {
  const {
    weather,
    errorMessage,
    isLoading,
    searchWeather,
    getCurrentWeather,
  } = useWeather();

  const {
    histories,
    addHistory,
  } = useHistory();

  async function handleSearch(city) {
    const weatherData = await searchWeather(city);

    if (weatherData) {
      addHistory(weatherData.name);
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