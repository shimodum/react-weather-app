function WeatherCard({
  weather,
  children
}) {
  const icon =
    weather.weather[0].icon;

  const iconUrl =
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>

      {children}

      <img
        src={iconUrl}
        alt="weather-icon"
      />

      <p>
        天気：
        {weather.weather[0].description}
      </p>

      <p>
        気温：
        {Math.round(weather.main.temp)}℃
      </p>

      <p>
        湿度：
        {weather.main.humidity}%
      </p>

      <p>
        風速：
        {weather.wind.speed} m/s
      </p>
    </div>
  );
}

export default WeatherCard;