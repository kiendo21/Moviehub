import { useApp } from "../context.jsx";
import MovieCard from "../components/MovieCard.jsx";

export default function Wishlist({ onGoMovie }) {
    const { wishlist, toggleWishlist, isInWishlist } = useApp();

    return (
        <div className="browsePage">
            <div className="container">
                <div className="browseHeader">
                    <h1 className="browseTitle">❤ Phim yêu thích</h1>
                    <p className="browseSubtitle">{wishlist.length} bộ phim đã lưu</p>
                </div>

                {wishlist.length > 0 ? (
                    <div className="movieGrid movieGrid--browse">
                        {wishlist.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onGoMovie={onGoMovie}
                                isInWishlist={true}
                                onToggleWishlist={() => toggleWishlist(movie)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="emptyState">
                        <div className="emptyState__icon">💔</div>
                        <div className="emptyState__title">Chưa có phim yêu thích</div>
                        <p className="emptyState__desc">
                            Nhấn vào biểu tượng ❤ trên các bộ phim để lưu vào danh sách yêu thích của bạn
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
