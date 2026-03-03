import { useState } from "react";
import { useApp } from "../context.jsx";

export default function Auth() {
  const { currentUser, setCurrentUser } = useApp();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.email || !form.password) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (mode === "register" && !form.name) {
      setError("Vui lòng nhập họ tên.");
      return;
    }
    if (form.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    // Simulate auth
    if (mode === "login") {
      setCurrentUser({ name: form.email.split("@")[0], email: form.email });
      setSuccess("Đăng nhập thành công! Chào mừng trở lại 🎉");
    } else {
      setCurrentUser({ name: form.name, email: form.email });
      setSuccess("Đăng ký thành công! Chào mừng đến với MovieHub 🎬");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setForm({ name: "", email: "", password: "" });
    setSuccess("");
    setError("");
  };

  if (currentUser) {
    return (
      <div className="authPage">
        <div className="authCard authCard--profile">
          <div className="authCard__avatar">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="authCard__title">Chào, {currentUser.name}!</h2>
          <p className="authCard__email">{currentUser.email}</p>
          <div className="authProfile__stats">
            <div className="authProfile__stat">
              <span className="authProfile__statNum">0</span>
              <span className="authProfile__statLabel">Phim đã xem</span>
            </div>
            <div className="authProfile__stat">
              <span className="authProfile__statNum">0</span>
              <span className="authProfile__statLabel">Yêu thích</span>
            </div>
            <div className="authProfile__stat">
              <span className="authProfile__statNum">0</span>
              <span className="authProfile__statLabel">Đánh giá</span>
            </div>
          </div>
          <button className="btnOutline" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="authPage">
      <div className="authCard">
        {/* Tab switcher */}
        <div className="authTabs">
          <button
            className={`authTab ${mode === "login" ? "is-active" : ""}`}
            onClick={() => { setMode("login"); setError(""); setSuccess(""); }}
          >
            Đăng nhập
          </button>
          <button
            className={`authTab ${mode === "register" ? "is-active" : ""}`}
            onClick={() => { setMode("register"); setError(""); setSuccess(""); }}
          >
            Đăng ký
          </button>
        </div>

        <div className="authCard__body">
          <div className="authCard__icon">🎬</div>
          <h2 className="authCard__title">
            {mode === "login" ? "Chào mừng trở lại" : "Tạo tài khoản mới"}
          </h2>
          <p className="authCard__subtitle">
            {mode === "login"
              ? "Đăng nhập để lưu phim yêu thích và xem lịch sử"
              : "Đăng ký miễn phí, không cần thẻ tín dụng"}
          </p>

          <form className="authForm" onSubmit={handleSubmit}>
            {mode === "register" && (
              <div className="formGroup">
                <label className="formLabel">Họ và tên</label>
                <input
                  className="formInput"
                  type="text"
                  name="name"
                  placeholder="Nguyễn Văn A"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="formGroup">
              <label className="formLabel">Email</label>
              <input
                className="formInput"
                type="email"
                name="email"
                placeholder="email@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="formGroup">
              <label className="formLabel">Mật khẩu</label>
              <input
                className="formInput"
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            {error && <div className="formError">⚠ {error}</div>}
            {success && <div className="formSuccess">✅ {success}</div>}

            <button className="btnPrimary btnPrimary--full" type="submit">
              {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
            </button>
          </form>

          {mode === "login" && (
            <p className="authCard__footer">
              Chưa có tài khoản?{" "}
              <button className="linkBtn" onClick={() => setMode("register")}>
                Đăng ký ngay
              </button>
            </p>
          )}
          {mode === "register" && (
            <p className="authCard__footer">
              Đã có tài khoản?{" "}
              <button className="linkBtn" onClick={() => setMode("login")}>
                Đăng nhập
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}