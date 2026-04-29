import React from 'react';
import { FaCalendarAlt, FaBook } from 'react-icons/fa';

const HistoryList = ({ history, onClear }) => {
  if (history.length === 0) {
    return (
      <div className="empty-state">
        <FaBook />
        <p>История рекомендаций пуста</p>
        <small>Пройдите подбор книг на главной странице</small>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU');
  };

  const getParamLabel = (key, value) => {
    const labels = {
      age_range: { '0-12': '0-12 лет', '13-17': '13-17 лет', '18+': '18+ лет' },
      goal: {
        entertainment: 'Отдых',
        self_development: 'Саморазвитие',
        education: 'Образование',
        overcoming: 'Преодоление'
      },
      genre: {
        fantasy: 'Фэнтези',
        science_fiction: 'Фантастика',
        detective: 'Детектив',
        romance: 'Роман',
        business: 'Бизнес',
        self_development: 'Саморазвитие'
      },
      mood: {
        inspiration: 'Вдохновение',
        fun: 'Юмор',
        adventure: 'Приключения',
        intellectual: 'Интеллект'
      }
    };
    return labels[key]?.[value] || value;
  };

  return (
    <div className="history-list">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button onClick={onClear} className="action-btn clear" style={{ padding: '0.5rem 1rem' }}>
          Очистить историю
        </button>
      </div>

      {history.map((item) => (
        <div key={item.id} className="history-item">
          <div className="history-date">
            <FaCalendarAlt style={{ marginRight: '0.5rem' }} />
            {formatDate(item.created_at)}
          </div>
          <div className="history-params">
            <span className="param-badge">
              {getParamLabel('age_range', item.input_params.age_range)}
            </span>
            <span className="param-badge">
              {getParamLabel('goal', item.input_params.goal)}
            </span>
            <span className="param-badge">
              {getParamLabel('genre', item.input_params.genre)}
            </span>
            <span className="param-badge">
              {getParamLabel('mood', item.input_params.mood)}
            </span>
          </div>
          <div className="history-recommendations">
            <small style={{ color: '#8b6b4a', display: 'block', marginBottom: '0.5rem' }}>
              Рекомендованные книги:
            </small>
            {item.recommendations.map((rec, idx) => (
              <div key={idx} className="rec-mini">
                <div>
                  <div className="rec-mini-title">{rec.title}</div>
                  <div className="rec-mini-author">{rec.author}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;