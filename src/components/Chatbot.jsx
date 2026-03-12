import React, { useState } from 'react';
import geminiLogo from '../assets/movies/Gemini_logo.png';

/**
 * Mood → Genre mapping
 * Each mood maps to a list of TMDB genre IDs with Vietnamese labels
 */
const MOOD_MAP = {
    "😊 Vui vẻ": [
        { id: 35, name: "Phim Hài" },
        { id: 10751, name: "Phim Gia Đình" },
        { id: 16, name: "Phim Hoạt Hình" },
        { id: 10402, name: "Phim Nhạc" },
    ],
    "😢 Buồn bã": [
        { id: 18, name: "Phim Chính Kịch" },
        { id: 10749, name: "Phim Lãng Mạn" },
        { id: 10751, name: "Phim Gia Đình" },
    ],
    "🤯 Căng thẳng": [
        { id: 28, name: "Phim Hành Động" },
        { id: 53, name: "Phim Giật Gân" },
        { id: 878, name: "Phim Khoa Học Viễn Tưởng" },
    ],
    "💪 Cần động lực": [
        { id: 12, name: "Phim Phiêu Lưu" },
        { id: 28, name: "Phim Hành Động" },
        { id: 36, name: "Phim Lịch Sử" },
        { id: 18, name: "Phim Chính Kịch" },
    ],
    "💕 Lãng mạn": [
        { id: 10749, name: "Phim Lãng Mạn" },
        { id: 35, name: "Phim Hài" },
        { id: 10402, name: "Phim Nhạc" },
    ],
    "👻 Sợ hãi": [
        { id: 27, name: "Phim Kinh Dị" },
        { id: 9648, name: "Phim Bí Ẩn" },
        { id: 53, name: "Phim Giật Gân" },
    ],
};

const MOODS = Object.keys(MOOD_MAP);

export default function Chatbot({ onNavigateGenre }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMood, setSelectedMood] = useState(null);

    const handleMoodClick = (mood) => {
        setSelectedMood(mood);
    };

    const handleGenreClick = (genreId) => {
        setIsOpen(false);
        setSelectedMood(null);
        if (onNavigateGenre) {
            onNavigateGenre(genreId);
        }
    };

    const handleReset = () => {
        setSelectedMood(null);
    };

    return (
        <div className={`chatbot-container ${isOpen ? 'is-open' : ''}`}>
            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="chatbot-header__title">
                            <img src={geminiLogo} alt="Gemini" className="chatbot-header__icon" />
                            Gemini AI
                        </div>
                        <button className="chatbot-header__close" onClick={() => { setIsOpen(false); setSelectedMood(null); }}>✕</button>
                    </div>

                    <div className="chatbot-messages">
                        {/* Step 1: Ask mood */}
                        <div className="chat-bubble-wrapper model">
                            <div className="chat-bubble">
                                Xin chào! 👋 Bạn đang cảm thấy thế nào? Hãy chọn tâm trạng để tôi gợi ý thể loại phim nhé!
                            </div>
                        </div>

                        <div className="chat-chips">
                            {MOODS.map((mood) => (
                                <button
                                    key={mood}
                                    className={`chat-chip ${selectedMood === mood ? 'is-active' : ''}`}
                                    onClick={() => handleMoodClick(mood)}
                                >
                                    {mood}
                                </button>
                            ))}
                        </div>

                        {/* Step 2: Show genres based on selected mood */}
                        {selectedMood && (
                            <>
                                <div className="chat-bubble-wrapper user">
                                    <div className="chat-bubble">{selectedMood}</div>
                                </div>
                                <div className="chat-bubble-wrapper model">
                                    <div className="chat-bubble">
                                        Với tâm trạng <strong>{selectedMood}</strong>, bạn có thể thích những thể loại phim này. Bấm vào để xem ngay!
                                    </div>
                                </div>
                                <div className="chat-chips">
                                    {MOOD_MAP[selectedMood].map((genre) => (
                                        <button
                                            key={genre.id}
                                            className="chat-chip chat-chip--genre"
                                            onClick={() => handleGenreClick(genre.id)}
                                        >
                                            🎬 {genre.name}
                                        </button>
                                    ))}
                                </div>
                                <button className="chat-reset" onClick={handleReset}>← Chọn tâm trạng khác</button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Floating Toggle Button + Tooltip */}
            {!isOpen && (
                <div className="chatbot-toggle-wrapper">
                    <div className="chatbot-tooltip" onClick={() => setIsOpen(true)}>
                        Bạn đang cảm thấy thế nào?
                    </div>
                    <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
                        <img src={geminiLogo} alt="Gemini" className="chatbot-toggle__icon" />
                    </button>
                </div>
            )}
        </div>
    );
}
