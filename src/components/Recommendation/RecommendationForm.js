import React, { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import RecommendationResults from './RecommendationResults';
import { FaBook, FaSmile, FaBullseye, FaUser } from 'react-icons/fa';
import './RecommendationForm.css';

const RecommendationForm = () => {
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState(null);
    const [formData, setFormData] = useState({
        age_range: '',
        goal: '',
        genre: '',
        mood: ''
    });

    const ageOptions = [
        { value: '0-12', label: '0-12 лет' },
        { value: '13-17', label: '13-17 лет' },
        { value: '18+', label: '18+ лет' }
    ];

    const goalOptions = [
        { value: 'entertainment', label: 'Отдых/Развлечение' },
        { value: 'self_development', label: 'Саморазвитие/Навыки' },
        { value: 'education', label: 'Учеба/Образование' },
        { value: 'overcoming', label: 'Преодоление трудностей' }
    ];

    const genreOptions = [
        { value: 'fantasy', label: 'Фэнтези' },
        { value: 'science_fiction', label: 'Фантастика' },
        { value: 'detective', label: 'Детектив/Триллер' },
        { value: 'romance', label: 'Роман/Проза' },
        { value: 'business', label: 'Бизнес-литература' },
        { value: 'self_development', label: 'Саморазвитие' }
    ];

    const moodOptions = [
        { value: 'inspiration', label: 'Вдохновение/Мотивация' },
        { value: 'fun', label: 'Юмор/Развлечение' },
        { value: 'adventure', label: 'Напряжение/Адреналин' },
        { value: 'intellectual', label: 'Интеллектуальный вызов' }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.age_range || !formData.goal || !formData.genre || !formData.mood) {
            toast.error('Пожалуйста, заполните все поля');
            return;
        }

        setLoading(true);

        try {
            const response = await api.post('/recommend/', formData);
            setRecommendations(response.data.recommendations);
            toast.success('Рекомендации успешно получены!');
        } catch (error) {
            toast.error('Ошибка при получении рекомендаций');
            setRecommendations(null);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            age_range: '',
            goal: '',
            genre: '',
            mood: ''
        });
        setRecommendations(null);
    };

    return (
        <div className="recommendation-container">
            <div className="recommendation-header">
                <h1>Найдите идеальную книгу</h1>
                <p>Ответьте на несколько вопросов, и наша экспертная система подберет для вас лучшие книги</p>
            </div>

            <div className="recommendation-grid">
                <div className="form-card">
                    <form onSubmit={handleSubmit} className="recommendation-form">
                        <div className="form-group">
                            <label htmlFor="age_range">
                                <FaUser className="form-icon" />
                                Возраст читателя
                            </label>
                            <select
                                id="age_range"
                                name="age_range"
                                value={formData.age_range}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Выберите возраст</option>
                                {ageOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="goal">
                                <FaBullseye className="form-icon" />
                                Цель чтения
                            </label>
                            <select
                                id="goal"
                                name="goal"
                                value={formData.goal}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Выберите цель</option>
                                {goalOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="genre">
                                <FaBook className="form-icon" />
                                Жанр
                            </label>
                            <select
                                id="genre"
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Выберите жанр</option>
                                {genreOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="mood">
                                <FaSmile className="form-icon" />
                                Настроение
                            </label>
                            <select
                                id="mood"
                                name="mood"
                                value={formData.mood}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Выберите настроение</option>
                                {moodOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? 'Подбор книг...' : 'Подобрать книги'}
                            </button>
                            <button type="button" className="reset-btn" onClick={handleReset}>
                                Сбросить
                            </button>
                        </div>
                    </form>
                </div>

                {recommendations && recommendations.length > 0 && (
                    <RecommendationResults recommendations={recommendations} />
                )}
            </div>
        </div>
    );
};

export default RecommendationForm;