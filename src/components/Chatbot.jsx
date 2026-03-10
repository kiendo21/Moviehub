import React, { useState, useRef, useEffect } from 'react';
import { generateChatResponse } from '../gemini';
import geminiLogo from '../assets/movies/Gemini_logo.png';
import { useApp } from '../context';

const MOOD_MAP = {
    "😊 Vui vẻ": [{ id: 35, name: "Phim Hài" }, { id: 10751, name: "Phim Gia Đình" }, { id: 16, name: "Phim Hoạt Hình" }],
    "😢 Buồn bã": [{ id: 35, name: "Phim Hài" }, { id: 10749, name: "Phim Lãng Mạn" }, { id: 10402, name: "Phim Nhạc" }],
    "🤯 Căng thẳng": [{ id: 28, name: "Phim Hành Động" }, { id: 878, name: "Phim Khoa Học Viễn Tưởng" }, { id: 53, name: "Phim Gây Cấn" }],
    "💪 Cần động lực": [{ id: 12, name: "Phim Phiêu Lưu" }, { id: 14, name: "Phim Giả Tượng" }, { id: 36, name: "Phim Lịch Sử" }],
    "💕 Lãng mạn": [{ id: 10749, name: "Phim Lãng Mạn" }, { id: 18, name: "Phim Chính Kịch" }],
    "👻 Sợ hãi": [{ id: 27, name: "Phim Kinh Dị" }, { id: 9648, name: "Phim Bí Ẩn" }]
};

const MOOD_CHIPS = Object.keys(MOOD_MAP);

const INITIAL_MESSAGE = {
    id: 'init',
    role: 'model',
    text: 'Xin chào! 👋 Tôi là trợ lý AI của MOVIEHUB. Bạn đang cảm thấy thế nào hôm nay? Hãy chia sẻ hoặc chọn một tâm trạng bên dưới để tôi gợi ý ngay thể loại phim phù hợp nhé!'
};

export default function Chatbot({ onNavigate }) {
    const { setActiveGlobalGenres } = useApp();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (isOpen && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen, isLoading]);

    const handleSend = async (textToSend = inputText) => {
        const text = textToSend.trim();
        if (!text || isLoading) return;

        // Add user msg
        const newUserMsg = { id: Date.now(), role: 'user', text };
        setMessages((prev) => [...prev, newUserMsg]);
        setInputText("");

        // Check if it's a predefined mood
        if (MOOD_MAP[text]) {
            const genres = MOOD_MAP[text];
            const botMsg = {
                id: Date.now() + 1,
                role: 'model',
                text: `Khi cảm thấy **${text.slice(3)}**, bạn có thể xem các thể loại sau để hợp tâm trạng nhất. Nhấn vào để xem phim ngay nhé!`,
                buttons: genres
            };
            setTimeout(() => {
                setMessages((prev) => [...prev, botMsg]);
            }, 500); // slight delay for realism
            return;
        }

        // Otherwise call Gemini API
        setIsLoading(true);

        const historyForGemini = messages
            .concat(newUserMsg)
            .filter(m => m.id !== 'init' && !m.buttons) // Exclude local features from history
            .map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

        historyForGemini.unshift({
            role: 'model',
            parts: [{ text: INITIAL_MESSAGE.text }]
        });

        try {
            const responseText = await generateChatResponse(historyForGemini);
            setMessages((prev) => [...prev, { id: Date.now(), role: 'model', text: responseText }]);
        } catch (err) {
            setMessages((prev) => [...prev, { id: Date.now(), role: 'model', text: 'Lỗi kết nối. Vui lòng thử lại!' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenreClick = (genreId) => {
        setActiveGlobalGenres([genreId]);
        if (onNavigate) {
            onNavigate('browse');
        }
        setIsOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
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
                        <button className="chatbot-header__close" onClick={() => setIsOpen(false)}>✕</button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`chat-bubble-wrapper ${msg.role}`}>
                                <div className="chat-bubble">
                                    <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\\n/g, '<br/>') }} />
                                    {msg.buttons && (
                                        <div className="chat-bubble__buttons">
                                            {msg.buttons.map(b => (
                                                <button key={b.id} className="btnGhost btnGhost--sm" onClick={() => handleGenreClick(b.id)} style={{ marginTop: '8px', display: 'block', width: '100%', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)' }}>
                                                    {b.name} ›
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Show Mood Chips only if it's the beginning or right after welcome */}
                        {messages.length === 1 && (
                            <div className="chat-chips">
                                {MOOD_CHIPS.map(chip => (
                                    <button key={chip} className="chat-chip" onClick={() => handleSend(chip)}>
                                        {chip}
                                    </button>
                                ))}
                            </div>
                        )}

                        {isLoading && (
                            <div className="chat-bubble-wrapper model">
                                <div className="chat-bubble is-typing">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input">
                        <input
                            type="text"
                            placeholder="Nhập tâm trạng của bạn..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                        />
                        <button
                            className="chatbot-input__send"
                            onClick={() => handleSend()}
                            disabled={!inputText.trim() || isLoading}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Toggle Button */}
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
