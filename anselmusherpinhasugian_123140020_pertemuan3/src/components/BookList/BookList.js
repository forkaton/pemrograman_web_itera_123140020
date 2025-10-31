import React from 'react';
import { useBooks } from '../../context/BookContext';
import BookItem from '../BookItem/BookItem';
import './BookList.css';

const BookList = () => {
  const { filteredBooks } = useBooks(); // Ambil buku yang sudah difilter

  if (filteredBooks.length === 0) {
    return <p className="empty-list">Tidak ada buku yang ditemukan.</p>;
  }

  return (
    <div className="book-list-grid">
      {/* Render list buku menggunakan key unik */}
      {filteredBooks.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;