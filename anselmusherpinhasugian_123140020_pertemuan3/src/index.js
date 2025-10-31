// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // CSS Neon Ungu kita
import App from './App';
import { BookProvider } from './context/BookContext'; // <-- 1. Impor provider kita

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BookProvider> {/* <-- 2. Bungkus <App /> dengan <BookProvider> */}
      <App />
    </BookProvider>
  </React.StrictMode>
);