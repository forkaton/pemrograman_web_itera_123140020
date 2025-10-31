import React from 'react';
import { useBooks } from '../../context/BookContext';
import './BookItem.css';

const BookItem = ({ book }) => {
  const { deleteBook, editBook } = useBooks();

  // ----- INI BAGIAN YANG DIPERBAIKI -----
  const handleEdit = () => {
    // 1. Minta judul baru
    const newTitle = prompt("Masukkan judul baru:", book.title);
    // Jika user menekan "Cancel" (null) atau mengosongkan, hentikan fungsi
    if (newTitle === null || newTitle === "") return; 

    // 2. Minta penulis baru
    const newAuthor = prompt("Masukkan penulis baru:", book.author);
    // Jika user menekan "Cancel" (null) atau mengosongkan, hentikan fungsi
    if (newAuthor === null || newAuthor === "") return;

    // 3. Panggil fungsi editBook dari context dengan data baru
    editBook(book.id, { title: newTitle, author: newAuthor });
  };

  const getStatusLabel = (status) => {
    if (status === 'baca') return 'Sedang Dibaca';
    if (status === 'milik') return 'Sudah Dimiliki';
    if (status === 'beli') return 'Ingin Dibeli';
    return '';
  };

  return (
    <div className="book-item-card">
      {/* Badge status dengan warna neon */}
      <span className={`status-badge status-${book.status}`}>
        {getStatusLabel(book.status)}
      </span>
      
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">oleh: {book.author}</p>
      
      <div className="book-actions">
        <button className="btn-edit" onClick={handleEdit}>Edit</button>
        <button className="btn-delete" onClick={() => deleteBook(book.id)}>Hapus</button>
      </div>
    </div>
  );
};

export default BookItem;