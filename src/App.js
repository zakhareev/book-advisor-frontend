import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Layout/Header';
import Dialog from './components/Dialog/Dialog';
import Profile from './components/Profile/Profile';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AddBook from './components/Books/AddBook';
import BookList from './components/Books/BookList';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dialog />} />
              <Route path="/books" element={<BookList />} />
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff5e8',
                color: '#5a3e2b',
                border: '1px solid #f5a623',
                borderRadius: '12px',
                fontFamily: 'Inter, sans-serif'
              }
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;