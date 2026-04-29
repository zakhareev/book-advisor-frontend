import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaSignOutAlt, FaBook } from 'react-icons/fa';

const ProfileActions = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-actions">
      <button onClick={() => navigate('/')} className="action-btn">
        <FaBook style={{ marginRight: '0.5rem' }} />
        К подбору книг
      </button>
      <button onClick={handleLogout} className="action-btn logout">
        <FaSignOutAlt style={{ marginRight: '0.5rem' }} />
        Выйти
      </button>
    </div>
  );
};

export default ProfileActions;