import React from 'react';
import './Common.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Загрузка...</p>
    </div>
  );
};

export default LoadingSpinner;