import { useEffect, useState } from "react";
import api from "../services/api";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");

  const loadBooks = async () => {
    try {
      const response = await api.get("/books");
      setBooks(response.data);
    } catch (error) {
      alert("Не вдалося завантажити книги");
    }
  };

  const createBook = async () => {
    try {
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
      loadBooks();
    } catch (error) {
      alert("Помилка створення книги");
    }
  };

  const deleteBook = async (id) => {
    const confirmDelete = window.confirm("Ви впевнені, що хочете видалити книгу?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/books/${id}`);
      loadBooks();
    } catch (error) {
      alert("Помилка видалення книги");
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div>
      <h2>Список книг</h2>

      <div>
        <input
          placeholder="Назва"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />

        <button onClick={createBook}>Додати книгу</button>
      </div>

      <hr />

      {books.map((book) => (
        <div key={book.book_id}>
          <strong>{book.title}</strong> — {book.isbn}
          <button onClick={() => deleteBook(book.book_id)}>Видалити</button>
        </div>
      ))}
    </div>
  );
}