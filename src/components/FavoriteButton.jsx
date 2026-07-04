function FavoriteButton({
  cityName,
  isFavorite,
  onToggleFavorite
}) {
  return (
    <button
      className={
        isFavorite
          ? 'favorite-button favorite-active'
          : 'favorite-button'
      }
      onClick={() => onToggleFavorite(cityName)}
    >
      {isFavorite
        ? '★ 登録済み'
        : '☆ お気に入り登録'}
    </button>
  );
}

export default FavoriteButton;