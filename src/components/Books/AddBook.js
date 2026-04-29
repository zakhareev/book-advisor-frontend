import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import './Books.css';

const AddBook = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    link: '',
    suitable_for_age: '',
    suitable_for_goal: '',
    suitable_for_genre: '',
    suitable_for_mood: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/books/', form);
      toast.success('Книга добавлена!');
      navigate('/books');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Ошибка добавления');
    } finally {
      setLoading(false);
    }
  };

  const ageOptions = [
    { value: '', label: 'Не выбрано' },
    { value: '0-12', label: '0-12 лет' },
    { value: '13-17', label: '13-17 лет' },
    { value: '18+', label: '18+ лет' }
  ];

  const goalOptions = [
    { value: '', label: 'Не выбрано' },
    { value: 'entertainment', label: 'Отдых/Развлечение' },
    { value: 'self_development', label: 'Саморазвитие/Навыки' },
    { value: 'education', label: 'Учеба/Образование' },
    { value: 'overcoming', label: 'Преодоление трудностей' }
  ];

  const genreOptions = [
    { value: '', label: 'Не выбрано' },
    { value: 'fantasy', label: 'Фэнтези' },
    { value: 'science_fiction', label: 'Фантастика' },
    { value: 'detective', label: 'Детектив/Триллер' },
    { value: 'romance', label: 'Роман/Проза' },
    { value: 'business', label: 'Бизнес-литература' }
  ];

  const moodOptions = [
    { value: '', label: 'Не выбрано' },
    { value: 'inspiration', label: 'Вдохновение/Мотивация' },
    { value: 'fun', label: 'Юмор/Развлечение' },
    { value: 'adventure', label: 'Напряжение/Адреналин' },
    { value: 'intellectual', label: 'Интеллектуальный вызов' }
  ];

  return (
    <div className="add-book-container">
      <div className="add-book-card">
        <h2>Добавить книгу</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Название *"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Автор *"
            value={form.author}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="genre"
            placeholder="Жанр"
            value={form.genre}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Описание"
            value={form.description}
            onChange={handleChange}
            rows="4"
          />
          <input
            type="url"
            name="link"
            placeholder="Ссылка"
            value={form.link}
            onChange={handleChange}
          />

          <h3>Для каких пользователей подходит эта книга?</h3>

          <select name="suitable_for_age" value={form.suitable_for_age} onChange={handleChange}>
            {ageOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <select name="suitable_for_goal" value={form.suitable_for_goal} onChange={handleChange}>
            {goalOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <select name="suitable_for_genre" value={form.suitable_for_genre} onChange={handleChange}>
            {genreOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <select name="suitable_for_mood" value={form.suitable_for_mood} onChange={handleChange}>
            {moodOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <button type="submit" disabled={loading}>
            {loading ? 'Добавление...' : 'Добавить книгу'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;