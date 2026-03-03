import { useState, useMemo } from "react";
import { MOVIES, GENRES } from "../context.jsx";
import { useApp } from "../context.jsx";
import MovieCard from "../components/MovieCard.jsx";

export default function Browse({ onGoMovie }) {
  const { toggleWishlist, isInWishlist } = useApp();
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("Tất Cả");
  const [sort, setSort] = useState("rating");

  const filtered = useMemo(() => {
    let list = [...MOVIES];

    // Filter by genre
    if (activeGenre !== "Tất Cả") {
      list = list.filter((m) => m.genres.includes(activeGenre));
    }

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.originalTitle.toLowerCase().includes(q) ||
          m.cast.some((c) => c.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sort === "year") list.sort((a, b) => b.year - a.year);
    else if (sort === "title") list.sort((a, b) => a.title.localeCompare(b.title, "vi"));

    return list;
  }, [search, activeGenre, sort]);

  return (
    <div className="browsePage">
      <div className="container">
        {/* Header */}
        <div className="browseHeader">
          <h1 className="browseTitle">Danh sách phim</h1>
          <p className="browseSubtitle">{filtered.length} bộ phim</p>
        </div>

        {/* Search bar */}
        <div className="browseSearch">
          <span className="browseSearch__icon">⌕</span>
          <input
            className="browseSearch__input"
            type="text"
            placeholder="Tìm phim, diễn viên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          {search && (
            <button className="browseSearch__clear" onClick={() => setSearch("")}>✕</button>
          )}
        </div>

        {/* Controls */}
        <div className="browseControls">
          {/* Genre filter */}
          <div className="genreFilter">
            {GENRES.map((g) => (
              <button
                key={g}
                className={`genreFilterBtn ${activeGenre === g ? "is-active" : ""}`}
                onClick={() => setActiveGenre(g)}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="sortControl">
            <label className="sortLabel">Sắp xếp:</label>
            <select
              className="sortSelect"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="rating">Điểm cao nhất</option>
              <option value="year">Mới nhất</option>
              <option value="title">Tên A-Z</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="movieGrid movieGrid--browse">
            {filtered.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onGoMovie={onGoMovie}
                isInWishlist={isInWishlist(movie.id)}
                onToggleWishlist={() => toggleWishlist(movie.id)}
              />
            ))}
          </div>
        ) : (
          <div className="emptyState">
            <div className="emptyState__icon">🎬</div>
            <div className="emptyState__title">Không tìm thấy phim</div>
            <p className="emptyState__desc">Thử tìm kiếm với từ khóa khác hoặc đổi thể loại</p>
            <button
              className="btnPrimary"
              onClick={() => { setSearch(""); setActiveGenre("Tất Cả"); }}
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
}