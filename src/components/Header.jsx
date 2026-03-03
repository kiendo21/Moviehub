import { useApp } from "../context.jsx";

export default function Header({ tab, onChangeTab }) {
  const { wishlist, currentUser } = useApp();

  return (
    <header className="topbar">
      <div className="container topbar__inner headerSimple">
        <div className="brand brand--red" onClick={() => onChangeTab("home")}>
          🎬 MOVIEHUB
        </div>

        <div className="searchRect" onClick={() => onChangeTab("browse")} role="button">
          <span className="searchRect__icon">⌕</span>
          <span className="searchRect__text">Tìm kiếm phim, diễn viên...</span>
        </div>

        <nav className="menuSimple">
          <button
            className={tab === "browse" ? "is-active" : ""}
            onClick={() => onChangeTab("browse")}
          >
            Danh sách phim
          </button>

          <button
            className={tab === "wishlist" ? "is-active" : ""}
            onClick={() => onChangeTab("wishlist")}
          >
            ❤ Yêu thích
            {wishlist.length > 0 && (
              <span className="badge">{wishlist.length}</span>
            )}
          </button>

          <button
            className={`btnAuthNav ${tab === "auth" ? "is-active" : ""}`}
            onClick={() => onChangeTab("auth")}
          >
            {currentUser ? `👤 ${currentUser.name}` : "Đăng nhập"}
          </button>
        </nav>
      </div>
    </header>
  );
}