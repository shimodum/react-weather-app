function SearchForm({
  city,
  setCity,
  onSearch,
  isLoading
}) {
  function handleSubmit(event) {
    event.preventDefault();

    onSearch(city);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="search-form"
    >
      <input
        type="text"
        placeholder="都市名または都道府県名を入力"
        value={city}
        disabled={isLoading}
        onChange={(event) =>
          setCity(event.target.value)
        }
      />

      <button
        type="submit"
        disabled={isLoading}
      >
        {isLoading
          ? '検索中...'
          : '検索'}
      </button>
    </form>
  );
}

export default SearchForm;