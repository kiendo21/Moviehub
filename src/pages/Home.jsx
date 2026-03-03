import { useMemo, useState } from "react";

export default function Home({ onGoBrowse }) {
  const hotMovies = useMemo(
    () => [
      { id: 1, title: "Cô Hầu Gái", year: 2025, thumb: "" },
      { id: 2, title: "Phim Hot 2", year: 2024, thumb: "" },
      { id: 3, title: "Phim Hot 3", year: 2023, thumb: "" },
      { id: 4, title: "Phim Hot 4", year: 2022, thumb: "" },
      { id: 5, title: "Phim Hot 5", year: 2021, thumb: "" },
    ],
    []
  );

  const genres = useMemo(() => ["Hài Hước", "Phiêu Lưu", "Kinh Dị", "Hành Động", "Tình Cảm"], []);

  const [activeHot, setActiveHot] = useState(0);

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero__inner hero2">
          <div className="hero__content">
            <div className="hero__title">Cô Hầu Gái (2025)</div>
            <div className="hero__subtitle">The Housemaid (2025)</div>

            <div className="hero__meta">
              <span className="chip chip--imdb">IMDB 7.0</span>
              <span className="chip">2025</span>
              <span className="chip">2h 11m</span>
            </div>

            <div className="genreRow">
              {genres.map((g) => (
                <button key={g} className="genreChip" onClick={onGoBrowse}>
                  {g}
                </button>
              ))}
            </div>

            <p className="hero__desc">
              Một thế giới hỗn loạn mở ra, nơi sự hoàn hảo chỉ là ảo giác...
            </p>

            <div className="hero__actions">
              <button className="btnPrimary" onClick={onGoBrowse}>
                ▶ Xem ngay
              </button>
              <button className="btnGhost">❤</button>
              <button className="btnGhost">!</button>
            </div>
          </div>

          <div className="hotRail">
            <div className="hotRail__label">Đang hot</div>

            <div className="hotRail__thumbs">
              {hotMovies.map((m, idx) => (
                <button
                  key={m.id}
                  className={`hotThumb ${idx === activeHot ? "is-active" : ""}`}
                  onClick={() => setActiveHot(idx)}
                  title={`${m.title} (${m.year})`}
                >
                  <div className="hotThumb__img" />
                </button>
              ))}
            </div>

            <div className="hotRail__hint">
            
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section__title">Bạn đang quan tâm gì?</div>

        <div className="topicGrid">
          <div className="topicCard topicCard--1">
            <div className="topicCard__name">Marvel</div>
            <div className="topicCard__cta">Xem chủ đề →</div>
          </div>
          <div className="topicCard topicCard--2">
            <div className="topicCard__name">Sitcom</div>
            <div className="topicCard__cta">Xem chủ đề →</div>
          </div>
          <div className="topicCard topicCard--3">
            <div className="topicCard__name">Lồng Tiếng Cực Mạnh</div>
            <div className="topicCard__cta">Xem chủ đề →</div>
          </div>
          <div className="topicCard topicCard--4">
            <div className="topicCard__name">Xuyên Không</div>
            <div className="topicCard__cta">Xem chủ đề →</div>
          </div>
          <div className="topicCard topicCard--5">
            <div className="topicCard__name">Cổ Trang</div>
            <div className="topicCard__cta">Xem chủ đề →</div>
          </div>
          <div className="topicCard topicCard--6">
            <div className="topicCard__name">Phim Nhức Đầu</div>
            <div className="topicCard__cta">Xem chủ đề →</div>
          </div>
        </div>
      </section>
    </div>
  );
}