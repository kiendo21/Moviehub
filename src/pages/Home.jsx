import { useMemo, useState } from "react";
import { MOVIES, GENRES } from "../context.jsx";
import { useApp } from "../context.jsx";
import MovieCard from "../components/MovieCard.jsx";

const HERO_MOVIE = MOVIES[0]; // Cô Hầu Gái as hero

export default function Home({ onGoBrowse, onGoMovie }) {
  const { toggleWishlist, isInWishlist } = useApp();
  const [activeHot, setActiveHot] = useState(0);

  const hotMovies = useMemo(() => MOVIES.slice(0, 5), []);
  const featuredMovies = useMemo(() => MOVIES.slice(1, 7), []);
  const heroData = hotMovies[activeHot] || HERO_MOVIE;

  const genreChips = useMemo(
    () => ["Hài Hước", "Phiêu Lưu", "Kinh Dị", "Hành Động", "Tình Cảm"],
    []
  );

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="container hero__inner hero2">
          {/* Left: hero content */}
          <div className="hero__content">
            <div className="hero__badges">
              {heroData.genres.slice(0, 2).map((g) => (
                <span key={g} className="heroBadge">{g}</span>
              ))}
            </div>
            <div className="hero__title">{heroData.title}</div>
            <div className="hero__subtitle">{heroData.originalTitle} ({heroData.year})</div>

            <div className="hero__meta">
              <span className="chip chip--imdb">⭐ {heroData.rating}</span>
              <span className="chip">{heroData.year}</span>
              <span className="chip">{heroData.duration}</span>
            </div>

            <p className="hero__desc">{heroData.desc}</p>

            <div className="hero__actions">
              <button className="btnPrimary" onClick={() => onGoMovie(heroData.id)}>
                ▶ Xem ngay
              </button>
              <button
                className={`btnGhost ${isInWishlist(heroData.id) ? "is-wishlisted" : ""}`}
                onClick={() => toggleWishlist(heroData.id)}
                title="Thêm vào yêu thích"
              >
                {isInWishlist(heroData.id) ? "❤" : "🤍"}
              </button>
              <button className="btnGhost" onClick={() => onGoBrowse()}>
                ℹ
              </button>
            </div>
          </div>

          {/* Right: hot rail */}
          <div className="hotRail">
            <div className="hotRail__label">🔥 Đang hot</div>
            <div className="hotRail__thumbs">
              {hotMovies.map((m, idx) => (
                <button
                  key={m.id}
                  className={`hotThumb ${idx === activeHot ? "is-active" : ""}`}
                  onClick={() => setActiveHot(idx)}
                  title={`${m.title} (${m.year})`}
                >
                  <img
                    className="hotThumb__img"
                    src={m.thumb}
                    alt={m.title}
                    loading="lazy"
                  />
                  <div className="hotThumb__title">{m.title}</div>
                </button>
              ))}
            </div>
            <div className="hotRail__hint">Nhấn để xem thêm ›</div>
          </div>
        </div>
      </section>

      {/* GENRE SECTION */}
      <section className="container section">
        <div className="section__title">Bạn đang quan tâm gì?</div>
        <div className="topicGrid">
          {[
            { name: "Marvel", cls: "topicCard--1", emoji: "🦸" },
            { name: "Sitcom", cls: "topicCard--2", emoji: "😂" },
            { name: "Lồng Tiếng", cls: "topicCard--3", emoji: "🎙️" },
            { name: "Xuyên Không", cls: "topicCard--4", emoji: "⏳" },
            { name: "Cổ Trang", cls: "topicCard--5", emoji: "🏯" },
            { name: "Phim Mind-Blowing", cls: "topicCard--6", emoji: "🤯" },
          ].map((t) => (
            <div
              key={t.name}
              className={`topicCard ${t.cls}`}
              onClick={onGoBrowse}
            >
              <div className="topicCard__emoji">{t.emoji}</div>
              <div className="topicCard__name">{t.name}</div>
              <div className="topicCard__cta">Xem chủ đề →</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED MOVIES */}
      <section className="container section">
        <div className="sectionHeader">
          <div className="section__title">Phim nổi bật</div>
          <button className="seeAllBtn" onClick={onGoBrowse}>Xem tất cả →</button>
        </div>
        <div className="movieGrid">
          {featuredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onGoMovie={onGoMovie}
              isInWishlist={isInWishlist(movie.id)}
              onToggleWishlist={() => toggleWishlist(movie.id)}
            />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer__brand">🎬 MOVIEHUB</div>
          <p className="footer__copy">© 2025 MovieHub. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
}