import { useState } from "react";
import { loginUser } from "../services/authService";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
        setMessage("Пароль повинен містити мінімум 8 символів");
        return;
    }

    setLoading(true);
     setMessage("");

    try {
        await loginUser({ email, password });

        // показуємо повідомлення
        setMessage("Успішний логін, перенаправлення...");

        // ЗАТРИМКА 2 секунди
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);

    } catch (err) {
        setMessage("Помилка логіну. Перевір email і пароль.");
    } finally {
        setLoading(false);
      }
    };
  return (
    <div className="page auth-page">
      <div className="card auth-card">
        <h2>Вхід у систему</h2>
        <p className="subtitle">Увійди, щоб працювати з книгами</p>

        {message && (
          <div className={`notice ${message.includes("Помилка") || message.includes("мінімум") ? "error" : "success"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Завантаження..." : "Увійти"}
          </button>
        </form>

        <p className="auth-link">
          Немає акаунта? <a href="/register">Зареєструватися</a>
        </p>
      </div>
    </div>
  );
}