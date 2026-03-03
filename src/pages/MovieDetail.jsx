import { useMemo } from "react";
import { MOVIES } from "../context.jsx";
import { useApp } from "../context.jsx";
import MovieCard from "../components/MovieCard.jsx";

export default function MovieDetail({ movieId, onGoBack, onGoMovie }) {
    const { toggleWishlist, isInWishlist } = useApp();
    const movie = MOVIES.find((m) => m.id === movieId);

    const related = useMemo(() => {
        if (!movie) return [];
        return MOVIES.filter(
            (m) => m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g))
        ).slice(0, 4);
    }, [movie]);

    if (!movie) {
        return (
            <div className="container browsePage">
                <p>Không tìm thấy phim.</p>
                <button className="btnGhost" onClick={onGoBack}>← Quay lại</button>
            </div>
        );
    }

    const inWishlist = isInWishlist(movie.id);

    return (
        <div className="detailPage">
            {/* Backdrop */}
            <div
                className="detailBackdrop"
                style={{ backgroundImage: `url(${movie.backdrop || movie.thumb})` }}
            >
                <div className="detailBackdrop__overlay" />
            </div>

            <div className="container detailContent">
                {/* Back button */}
                <button className="backBtn" onClick={onGoBack}>
                    ← Quay lại
                </button>

                <div className="detailHero">
                    {/* Poster */}
                    <div className="detailPoster">
                        <img src={movie.thumb} alt={movie.title} />
                    </div>

                    {/* Info */}
                    <div className="detailInfo">
                        <div className="detailInfo__genres">
                            {movie.genres.map((g) => (
                                <span key={g} className="heroBadge">{g}</span>
                            ))}
                        </div>

                        <h1 className="detailInfo__title">{movie.title}</h1>
                        <div className="detailInfo__original">{movie.originalTitle}</div>

                        <div className="detailInfo__meta">
                            <span className="chip chip--imdb">⭐ {movie.rating}/10</span>
                            <span className="chip">{movie.year}</span>
                            <span className="chip">{movie.duration}</span>
                        </div>

                        <p className="detailInfo__desc">{movie.desc}</p>

                        <div className="detailInfo__cast">
                            <span className="detailInfo__castLabel">Diễn viên:</span>
                            {movie.cast.join(", ")}
                        </div>

                        <div className="detailInfo__actions">
                            <button className="btnPrimary btnPrimary--lg">
                                ▶ Xem ngay
                            </button>
                            <button
                                className={`btnGhost btnGhost--lg ${inWishlist ? "is-wishlisted" : ""}`}
                                onClick={() => toggleWishlist(movie.id)}
                            >
                                {inWishlist ? "❤ Đã yêu thích" : "🤍 Yêu thích"}
                            </button>
                            <button className="btnGhost btnGhost--lg">
                                📤 Chia sẻ
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related movies */}
                {related.length > 0 && (
                    <section className="section">
                        <div className="section__title">Phim tương tự</div>
                        <div className="movieGrid">
                            {related.map((m) => (
                                <MovieCard
                                    key={m.id}
                                    movie={m}
                                    onGoMovie={onGoMovie}
                                    isInWishlist={isInWishlist(m.id)}
                                    onToggleWishlist={() => toggleWishlist(m.id)}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
