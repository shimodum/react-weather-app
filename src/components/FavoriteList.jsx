function FavoriteList({
  favorites,
  onSelectFavorite
}) {
  if (favorites.length === 0) {
    return null;
  }

  return (
    <section className="favorites">
      <h2>お気に入り</h2>

      <ul>
        {favorites.map((favorite) => (
          <li
            key={favorite}
            onClick={() => onSelectFavorite(favorite)}
          >
            {favorite}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FavoriteList;