import { useState } from 'react';

import {
  fetchWeatherByCity,
  fetchWeatherByLocation,
  fetchForecastByCity,
  fetchForecastByLocation,
  fetchWeatherByZip,
  fetchForecastByZip
} from '../api/weatherApi';

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function searchWeather(keyword) {
    try {
      setErrorMessage('');
      setIsLoading(true);

      const [weatherData, forecastData] =
        await fetchWeatherData(keyword);

      setWeather(weatherData);
      setForecast(forecastData);

      return weatherData;
    } catch (error) {
      setWeather(null);
      setForecast(null);
      setErrorMessage(error.message);

      return null;
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchWeatherData(keyword) {
    if (isZipCode(keyword)) {
      return await Promise.all([
        fetchWeatherByZip(keyword),
        fetchForecastByZip(keyword)
      ]);
    }

    return await Promise.all([
      fetchWeatherByCity(keyword),
      fetchForecastByCity(keyword)
    ]);
  }

  function isZipCode(keyword) {
    return /^\d{3}-?\d{4}$/.test(keyword);
  }

  async function getCurrentWeather() {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            setErrorMessage('');
            setIsLoading(true);

            const { latitude, longitude } = position.coords;

            const [weatherData, forecastData] =
              await Promise.all([
                fetchWeatherByLocation(latitude, longitude),
                fetchForecastByLocation(latitude, longitude)
              ]);

            setWeather(weatherData);
            setForecast(forecastData);

            resolve(weatherData);
          } catch (error) {
            setWeather(null);
            setForecast(null);
            setErrorMessage(error.message);

            resolve(null);
          } finally {
            setIsLoading(false);
          }
        },
        () => {
          setErrorMessage('位置情報取得が許可されませんでした');
          resolve(null);
        }
      );
    });
  }

  function clearWeather(message) {
    setWeather(null);
    setForecast(null);
    setErrorMessage(message);
  }

  return {
    weather,
    forecast,
    errorMessage,
    isLoading,
    searchWeather,
    getCurrentWeather,
    setErrorMessage,
    clearWeather,
  };
}