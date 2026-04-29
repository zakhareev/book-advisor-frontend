import React from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FaBook, FaUser, FaStar, FaRegHeart, FaExternalLinkAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import './RecommendationResults.css';

const RecommendationResults = ({ recommendations }) => {
    const { user } = useAuth();

    const handleAddToFavorites = async (book) => {
        if (!user) {
            toast.error('Войдите в систему, чтобы добавлять книги в избранное');
            return;
        }

        try {
            await api.post('/profile/favorites', {
                book_title: book.title,
                book_author: book.author,
                link: book.link
            });
            toast.success('Книга добавлена в избранное!');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Ошибка при добавлении в избранное');
        }
    };

    return (
        <div className="results-container">
            <div className="results-header">
                <h2>Рекомендованные книги</h2>
                <p>На основе ваших предпочтений мы подобрали для вас:</p>
            </div>

            <div className="books-grid">
                {recommendations.map((book, index) => (
                    <div key={index} className="book-card">
                        <div className="book-card-header">
                            <div className="book-icon">
                                <FaBook />
                            </div>
                            <button
                                onClick={() => handleAddToFavorites(book)}
                                className="favorite-btn"
                                title="Добавить в избранное"
                            >
                                <FaRegHeart />
                            </button>
                        </div>

                        <div className="book-content">
                            <h3 className="book-title">{book.title}</h3>
                            <div className="book-author">
                                <FaUser className="author-icon" />
                                <span>{book.author}</span>
                            </div>

                            <div className="book-reason">
                                <FaCheckCircle className="reason-icon" />
                                <p>{book.reason}</p>
                            </div>

                            <div className="book-rating">
                                <div className="rating-stars">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="star" />
                                    ))}
                                </div>
                                <span className="rating-text">4.5/5</span>
                            </div>

                            <div className="book-meta">
                                <div className="meta-item">
                                    <FaClock className="meta-icon" />
                                    <span>~8-10 часов</span>
                                </div>
                            </div>

                            {book.link && (
                                <a
                                    href={book.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="book-link"
                                >
                                    <FaExternalLinkAlt />
                                    <span>Купить на Litres</span>
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendationResults;