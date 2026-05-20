import { useState } from 'react';

import {
  fetchWeatherByCity,
  fetchWeatherByLocation
} from '../api/weatherApi';

export function useWeather() {

  const [weather, setWeather] =
    useState(null);

  const [errorMessage, setErrorMessage] =
    useState('');

  const [isLoading, setIsLoading] =
    useState(false);

  async function searchWeather(city) {

    try {

      setErrorMessage('');
      setIsLoading(true);

      const weatherData =
        await fetchWeatherByCity(city);

      setWeather(weatherData);

      return weatherData;

    } catch(error) {

      setWeather(null);

      setErrorMessage(
        error.message
      );

      return null;

    } finally {

      setIsLoading(false);

    }
  }

  async function getCurrentWeather() {

    return new Promise((resolve)=>{

      navigator.geolocation.getCurrentPosition(

        async(position)=>{

          try{

            setErrorMessage('');
            setIsLoading(true);

            const weatherData =
              await fetchWeatherByLocation(
                position.coords.latitude,
                position.coords.longitude
              );

            setWeather(weatherData);

            resolve(weatherData);

          }catch(error){

            setWeather(null);

            setErrorMessage(
              error.message
            );

            resolve(null);

          }finally{

            setIsLoading(false);

          }

        },

        ()=>{

          setErrorMessage(
            '位置情報取得が許可されませんでした'
          );

          resolve(null);

        }

      );

    });

  }

  return {
    weather,
    errorMessage,
    isLoading,
    searchWeather,
    getCurrentWeather
  };

}