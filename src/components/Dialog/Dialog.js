import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import './Dialog.css';

const Dialog = () => {
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ratingLoading, setRatingLoading] = useState(null);
  const [userRatings, setUserRatings] = useState({});
  const [favoritesLoading, setFavoritesLoading] = useState(null);

  const startDialog = async () => {
    setLoading(true);
    setFinished(false);
    setRecommendations([]);
    setCurrentQuestion(null);
    setProgress(0);
    setSessionId(null);

    try {
      const response = await api.post('/dialog/start', {});
      setSessionId(response.data.session_id);
      setCurrentQuestion(response.data.question);
      setProgress(response.data.progress);
    } catch (error) {
      toast.error('Ошибка начала диалога');
      console.error('Start dialog error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    startDialog();
  }, []);

  const handleAnswer = async (answerValue) => {
    if (!sessionId) return;
    setLoading(true);
    try {
      const response = await api.post('/dialog/respond', {
        session_id: sessionId,
        answer: answerValue
      });
      if (response.data.finished) {
        setFinished(true);
        setRecommendations(response.data.recommendations);
      } else {
        setCurrentQuestion(response.data.question);
        setProgress(response.data.progress);
      }
    } catch (error) {
      toast.error('Ошибка отправки ответа');
      console.error('Answer error:', error);
    } finally {
      setLoading(false);
    }
  };

  const rateBook = async (bookId, rating) => {
    if (!bookId) {
      toast.error('Нельзя оценить эту книгу');
      return;
    }
    setRatingLoading(bookId);
    try {
      await api.post(`/books/${bookId}/rate`, { rating });
      toast.success('Оценка сохранена');
      setUserRatings(prev => ({ ...prev, [bookId]: rating }));
    } catch (error) {
      toast.error('Ошибка при оценке');
      console.error('Rate error:', error);
    } finally {
      setRatingLoading(null);
    }
  };

  const addToFavorites = async (book) => {
    setFavoritesLoading(book.title);
    try {
      await api.post('/profile/favorites', {
        book_title: book.title,
        book_author: book.author,
        link: book.link
      });
      toast.success('Книга добавлена в избранное');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Ошибка при добавлении в избранное');
      console.error('Favorite error:', error);
    } finally {
      setFavoritesLoading(null);
    }
  };

  if (finished) {
    return (
      <div className="dialog-results">
        <h2>Ваши рекомендации</h2>
        <div className="books-grid">
          {recommendations.map((book, idx) => (
            <div key={idx} className="book-card">
              <div className="book-source-badge">
                {book.source === 'crowd' ? 'Добавлена сообществом' : 'Экспертная рекомендация'}
              </div>
              <h3>{book.title}</h3>
              <p className="author">{book.author}</p>
              <p className="reason">{book.reason}</p>
              {book.id && (
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
                    <span className="avg-rating">{book.average_rating.toFixed(1)} ({book.rating_count} оценок)</span>
                  )}
                </div>
              )}
              <div className="book-actions">
                <button
                  onClick={() => addToFavorites(book)}
                  className="favorite-btn-small"
                  disabled={favoritesLoading === book.title}
                >
                  {favoritesLoading === book.title ? '...' : <><FaRegHeart /> В избранное</>}
                </button>
                {book.link && (
                  <a href={book.link} target="_blank" rel="noopener noreferrer" className="buy-link">
                    Купить
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <button onClick={startDialog} className="restart-btn">
          Начать новый подбор
        </button>
      </div>
    );
  }

  if (loading && !currentQuestion) {
    return <div className="loading-spinner">Загрузка...</div>;
  }

  return (
    <div className="dialog-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress * 100}%` }}></div>
      </div>
      <div className="question-card">
        <h3>{currentQuestion?.text}</h3>
        <div className="options">
          {currentQuestion?.options.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              disabled={loading}
              className="option-btn"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dialog;