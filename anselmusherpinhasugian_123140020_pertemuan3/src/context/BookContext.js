import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid'; // Import uuid yang baru kita instal sebelumnya di terminal

// 1. Buat Context
const BookContext = createContext();

// 2. Buat custom hook agar gampang dipakai
export const useBooks = () => {
  return useContext(BookContext);
};

// 3. Buat Provider (komponen yang akan membungkus aplikasi kita)
export const BookProvider = ({ children }) => {
  // Gunakan custom hook useLocalStorage kita! (Tahap 3)
  const [books, setBooks] = useLocalStorage('books', []); // Key 'books', defaultnya array kosong
  
  // State untuk filter dan pencarian
  const [filter, setFilter] = useState('semua'); // Status filter: semua, milik, baca, beli
  const [searchQuery, setSearchQuery] = useState('');

  // Fungsi CRUD (Create, Read, Update, Delete)
  const addBook = (book) => {
    // book = { title, author, status }
    const newBook = { ...book, id: uuidv4() };
    setBooks([...books, newBook]);
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const editBook = (id, updatedBook) => {
    setBooks(
      books.map((book) => (book.id === id ? { ...book, ...updatedBook } : book))
    );
  };

  // Logika untuk memfilter dan mencari buku (Ini bagian Read-nya)
  const filteredBooks = books
    .filter((book) => {
      // 1. Filter berdasarkan status
      if (filter === 'semua') return true;
      return book.status === filter;
    })
    .filter((book) => {
      // 2. Filter berdasarkan pencarian
      return book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             book.author.toLowerCase().includes(searchQuery.toLowerCase());
    });

  // Nilai-nilai yang akan kita bagikan ke seluruh aplikasi
  const value = {
    books,
    filteredBooks,
    addBook,
    deleteBook,
    editBook,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};