function HistoryList({ histories, onSelectHistory }) {
  if (histories.length === 0) {
    return null;
  }

  return (
    <div className="history">
      <h2>検索履歴</h2>

      <ul>
        {histories.map((city) => (
          <li
            key={city}
            onClick={() => onSelectHistory(city)}
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryList;