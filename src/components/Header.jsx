export default function Header({ tab, onChangeTab }) {
  return (
    <header className="topbar">
      <div className="container topbar__inner headerSimple">
        <div className="brand brand--red" onClick={() => onChangeTab("home")}>
          MOVIEHUB
        </div>

        <div className="searchRect" onClick={() => onChangeTab("browse")} role="button">
          <span className="searchRect__icon">⌕</span>
          <span className="searchRect__text">Tìm kiếm phim, diễn viên</span>
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
            Yêu thích
          </button>

          <button
            className={tab === "auth" ? "is-active" : ""}
            onClick={() => onChangeTab("auth")}
          >
            Đăng nhập
          </button>
        </nav>
      </div>
    </header>
  );
}