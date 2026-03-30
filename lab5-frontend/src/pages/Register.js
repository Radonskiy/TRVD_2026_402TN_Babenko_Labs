import { useState } from "react";
import { registerUser } from "../services/authService";
import "../App.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setMessage("Пароль повинен містити мінімум 8 символів");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      await registerUser({ email, password });
      setMessage("Реєстрація успішна. Тепер увійди в систему.");
    } catch (error) {
      setMessage("Помилка реєстрації");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <div className="card auth-card">
        <h2>Реєстрація</h2>
        <p className="subtitle">Створи новий акаунт</p>

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
            placeholder="Пароль (мінімум 8 символів)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Реєстрація..." : "Зареєструватися"}
          </button>
        </form>

        <p className="auth-link">
          Уже є акаунт? <a href="/login">Увійти</a>
        </p>
      </div>
    </div>
  );
}