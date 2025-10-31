// src/pages/Home.js
import React from 'react';
import BookForm from '../components/BookForm/BookForm';
import BookControls from '../components/BookControls/BookControls';
import BookList from '../components/BookList/BookList';

const Home = () => {
  return (
    <div>
      {/* 1. Form Tambah Buku */}
      <BookForm />
      
      {/* Garis pemisah neon */}
      <hr style={{ borderColor: 'var(--border-color)', margin: '2rem 0', opacity: 0.5 }} />
      
      <h2>Daftar Buku Saya</h2>
      
      {/* 2. Filter dan Search Bar */}
      <BookControls />
      
      {/* 3. Daftar Buku */}
      <BookList />
    </div>
  );
};

export default Home;