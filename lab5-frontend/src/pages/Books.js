import { useEffect, useState } from "react";
import api from "../services/api";
import { logoutUser } from "../services/authService";
import "../App.css";
import { getUser } from "../services/authService";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get("/books");
      setBooks(response.data);
    } catch (error) {
      setMessage("Не вдалося завантажити книги");
    } finally {
      setLoading(false);
    }
  };

  const createBook = async () => {
    if (!title.trim() || !isbn.trim()) {
      setMessage("Заповни назву та ISBN");
      return;
    }

    try {
      setActionLoading(true);
      setMessage("");

      await api.post("/books", {
        title: title,
        isbn: isbn,
        publication_year: 2024,
        total_copies: 1,
        available_copies: 1,
        category_id: 1,
      });

      setTitle("");
      setIsbn("");
      setMessage("Книгу успішно додано");
      loadBooks();
    } catch (error) {
      setMessage("Помилка створення книги");
    } finally {
      setActionLoading(false);
    }
  };

 const deleteBook = async (id) => {
  const confirmDelete = window.confirm("Ви впевнені, що хочете видалити книгу?");
  if (!confirmDelete) return;

  try {
    setActionLoading(true);
    setMessage("");

    await api.delete(`/books/${id}`);
    setMessage("Книгу успішно видалено");
    loadBooks();
  } catch (error) {
    if (error.response?.status === 403) {
      setMessage("Видалення доступне тільки адміністратору");
    } else {
      setMessage("Помилка видалення книги");
    }
  } finally {
    setActionLoading(false);
  }
};

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/login";
  };

  useEffect(() => {
  setUser(getUser());
  loadBooks();
}, []);

  return (
    <div className="page">
      <header className="topbar">
         <div>
             <h1>Бібліотека</h1>
             <p className="subtitle">
                 {user ? `Роль: ${user.role}` : ""}
                </p>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
             Вийти
          </button>
      </header>

      {message && (
        <div className={`notice ${message.includes("Помилка") ? "error" : "success"}`}>
          {message}
        </div>
      )}

      <div className="card form-card">
        <h3>Додати нову книгу</h3>

        <div className="form-row">
          <input
            placeholder="Назва книги"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />

          <button onClick={createBook} disabled={actionLoading}>
            {actionLoading ? "Обробка..." : "Додати книгу"}
          </button>
        </div>
      </div>

      <div className="card list-card">
        <h3>Список книг</h3>

        {loading ? (
          <p className="loading-text">Завантаження книг...</p>
        ) : books.length === 0 ? (
          <p className="empty">Книг поки немає</p>
        ) : (
          <div className="book-list">
            {books.map((book) => (
              <div key={book.book_id} className="book-item">
                <div>
                  <strong>{book.title}</strong>
                  <p>ISBN: {book.isbn}</p>
                </div>

              {user?.role === "ADMIN" && (
                <button
                 className="delete-btn"
                 onClick={() => deleteBook(book.book_id)}
                 disabled={actionLoading}
                >
                 {actionLoading ? "Обробка..." : "Видалити"}
                </button>
)}
              </div>    
            ))}
          </div>
        )}
      </div>
    </div>
  );
}