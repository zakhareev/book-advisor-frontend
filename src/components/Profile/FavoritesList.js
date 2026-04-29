import React from 'react';
import { FaHeart, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';

const FavoritesList = ({ favorites, onRemove, onClear }) => {
  if (favorites.length === 0) {
    return (
      <div className="empty-state">
        <FaHeart />
        <p>Избранных книг пока нет</p>
        <small>Добавьте книги из рекомендаций</small>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <div className="favorites-list">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button onClick={onClear} className="action-btn clear" style={{ padding: '0.5rem 1rem' }}>
          Очистить всё
        </button>
      </div>

      {favorites.map((fav) => (
        <div key={fav.id} className="favorite-item">
          <div className="favorite-info">
            <div className="favorite-title">{fav.book_title}</div>
            <div className="favorite-author">{fav.book_author}</div>
            <small style={{ color: '#8b6b4a', fontSize: '0.75rem' }}>
              Добавлено: {formatDate(fav.added_at)}
            </small>
          </div>
          <div className="favorite-actions">
            {fav.link && (
              <a
                href={fav.link}
                target="_blank"
                rel="noopener noreferrer"
                className="favorite-link"
                title="Купить"
              >
                <FaExternalLinkAlt />
              </a>
            )}
            <button
              onClick={() => onRemove(fav.id)}
              className="remove-fav-btn"
              title="Удалить"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;