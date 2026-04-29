import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaBookOpen, FaUser, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaPlus, FaList } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <FaBookOpen className="logo-icon" />
          <span className="logo-text">Подбор книг</span>
        </Link>

        <div className="header-right">
          {user ? (
            <>
              <button
                className="header-btn books-btn"
                onClick={() => navigate('/books')}
              >
                <FaList />
                <span>Книги</span>
              </button>
              <button
                className="header-btn add-book-btn"
                onClick={() => navigate('/add-book')}
              >
                <FaPlus />
                <span>Добавить книгу</span>
              </button>
              <span className="user-email">
                <FaUser className="user-icon" />
                {user.email}
              </span>
              <button
                className="header-btn profile-btn"
                onClick={() => navigate('/profile')}
              >
                <FaUser />
                <span>Личный кабинет</span>
              </button>
              <button
                className="header-btn logout-btn"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                <span>Выход</span>
              </button>
            </>
          ) : (
            <>
              <button
                className="header-btn login-btn"
                onClick={() => navigate('/login')}
              >
                <FaSignInAlt />
                <span>Вход</span>
              </button>
              <button
                className="header-btn register-btn"
                onClick={() => navigate('/register')}
              >
                <FaUserPlus />
                <span>Регистрация</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;