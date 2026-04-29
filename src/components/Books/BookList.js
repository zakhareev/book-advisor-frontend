import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FaStar, FaRegStar, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Books.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ratingLoading, setRatingLoading] = useState(null);
  const [userRatings, setUserRatings] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const response = await api.get('/books/');
      setBooks(response.data.items);
    } catch (error) {
      toast.error('Ошибка загрузки книг');
    } finally {
      setLoading(false);
    }
  };

  const rateBook = async (bookId, rating) => {
    setRatingLoading(bookId);
    try {
      await api.post(`/books/${bookId}/rate`, { rating });
      toast.success('Оценка сохранена');
      setUserRatings(prev => ({ ...prev, [bookId]: rating }));
      loadBooks();
    } catch (error) {
      toast.error('Ошибка при оценке');
    } finally {
      setRatingLoading(null);
    }
  };

  const deleteBook = async (bookId) => {
    if (!window.confirm('Удалить книгу?')) return;
    try {
      await api.delete(`/books/${bookId}`);
      toast.success('Книга удалена');
      loadBooks();
    } catch (error) {
      toast.error('Ошибка удаления');
    }
  };

  if (loading) return <div className="loading-spinner">Загрузка книг...</div>;

  return (
    <div className="books-container">
      <h1>Каталог книг</h1>
      <div className="books-grid">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p className="author">{book.author}</p>
            {book.genre && <p className="genre">Жанр: {book.genre}</p>}
            {book.description && <p className="description">{book.description}</p>}
            <div className="rating-section">
              <div className="stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    className={`star-btn ${(userRatings[book.id] || 0) >= star ? 'active' : ''}`}
                    onClick={() => rateBook(book.id, star)}
                    disabled={ratingLoading === book.id}
                  >
                    {star <= (userRatings[book.id] || 0) ? <FaStar /> : <FaRegStar />}
                  </button>
                ))}
              </div>
              {book.average_rating > 0 && (
                <span className="avg-rating">Средняя: {book.average_rating.toFixed(1)} ({book.rating_count})</span>
              )}
            </div>
            <div className="book-actions">
              {book.link && (
                <a href={book.link} target="_blank" rel="noopener noreferrer" className="buy-link">
                  Купить
                </a>
              )}
              {user && (
                <button onClick={() => deleteBook(book.id)} className="delete-btn">
                  <FaTrash /> Удалить
                </button>
              )}
            </div>
            {book.suitable_for_age && (
              <div className="book-tags">
                <span className="tag">Для: {book.suitable_for_age}</span>
                {book.suitable_for_goal && <span className="tag">{book.suitable_for_goal}</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;