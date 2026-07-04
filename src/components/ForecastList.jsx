function ForecastList({ forecast }) {
  if (!forecast) {
    return null;
  }

  const dailyForecasts = forecast.list.filter((item) =>
    item.dt_txt.includes('12:00:00')
  );

  function formatDate(dateText) {
    const date = new Date(dateText);

    const month = date.getMonth() + 1;
    const day = date.getDate();

    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const weekday = weekdays[date.getDay()];

    return `${month}/${day}（${weekday}）`;
  }

  return (
    <section className="forecast">
      <h2>5日間予報</h2>

      <div className="forecast-list">
        {dailyForecasts.map((item) => {
          const icon = item.weather[0].icon;
          const iconUrl =
            `https://openweathermap.org/img/wn/${icon}@2x.png`;

          return (
            <div
              className="forecast-card"
              key={item.dt}
            >
              <p className="forecast-date">
                {formatDate(item.dt_txt)}
              </p>

              <img
                src={iconUrl}
                alt="forecast-icon"
              />

              <p>{item.weather[0].description}</p>
              <p>{Math.round(item.main.temp)}℃</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ForecastList;