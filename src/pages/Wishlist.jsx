import { useState } from "react";
import { useApp } from "../context.jsx";
import { MOVIES } from "../context.jsx";
import MovieCard from "../components/MovieCard.jsx";

export default function Wishlist({ onGoMovie }) {
    const { wishlist, toggleWishlist, isInWishlist } = useApp();

    const wishlistMovies = MOVIES.filter((m) => wishlist.includes(m.id));

    return (
        <div className="browsePage">
            <div className="container">
                <div className="browseHeader">
                    <h1 className="browseTitle">❤ Phim yêu thích</h1>
                    <p className="browseSubtitle">{wishlistMovies.length} bộ phim đã lưu</p>
                </div>

                {wishlistMovies.length > 0 ? (
                    <div className="movieGrid movieGrid--browse">
                        {wishlistMovies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onGoMovie={onGoMovie}
                                isInWishlist={true}
                                onToggleWishlist={() => toggleWishlist(movie.id)}
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
