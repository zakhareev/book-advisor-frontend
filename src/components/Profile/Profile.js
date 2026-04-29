import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import toast from 'react-hot-toast';
import HistoryList from './HistoryList';
import FavoritesList from './FavoritesList';
import ProfileActions from './ProfileActions';
import { FaUserCircle, FaHistory, FaHeart } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('history');
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadHistory();
    loadFavorites();
  }, [user, navigate]);

  const loadHistory = async () => {
    try {
      const response = await api.get('/profile/history?limit=5');
      setHistory(response.data);
    } catch (error) {
      toast.error('Ошибка загрузки истории');
    }
  };

  const loadFavorites = async () => {
    try {
      const response = await api.get('/profile/favorites');
      setFavorites(response.data);
    } catch (error) {
      toast.error('Ошибка загрузки избранного');
    }
  };

  const clearHistory = async () => {
    if (!window.confirm('Вы уверены, что хотите очистить всю историю?')) return;
    try {
      await api.delete('/profile/history/clear');
      toast.success('История очищена');
      loadHistory();
    } catch (error) {
      toast.error('Ошибка очистки истории');
    }
  };

  const removeFromFavorites = async (id) => {
    try {
      await api.delete(`/profile/favorites/${id}`);
      toast.success('Книга удалена из избранного');
      loadFavorites();
    } catch (error) {
      toast.error('Ошибка удаления');
    }
  };

  const clearFavorites = async () => {
    if (!window.confirm('Вы уверены, что хотите удалить все книги из избранного?')) return;
    try {
      await api.delete('/profile/favorites/clear');
      toast.success('Все книги удалены из избранного');
      loadFavorites();
    } catch (error) {
      toast.error('Ошибка очистки избранного');
    }
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <FaUserCircle />
        </div>
        <div className="profile-info">
          <h1>{user.email}</h1>
          <p>Личный кабинет Book Advisor</p>
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <FaHistory />
          <span>История рекомендаций</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          <FaHeart />
          <span>Избранные книги</span>
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'history' ? (
          <HistoryList history={history} onClear={clearHistory} />
        ) : (
          <FavoritesList
            favorites={favorites}
            onRemove={removeFromFavorites}
            onClear={clearFavorites}
          />
        )}
      </div>

      <ProfileActions />
    </div>
  );
};

export default Profile;