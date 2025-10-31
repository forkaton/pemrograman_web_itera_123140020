import React from 'react';
import { useBooks } from '../../context/BookContext';
import './BookItem.css';

const BookItem = ({ book }) => {
  const { deleteBook } = useBooks();

  // Fungsi untuk fitur edit (sesuai permintaan praktikum)
  // Kita gunakan prompt sederhana untuk demo.
  const handleEdit = () => {
    const newTitle = prompt("Masukkan judul baru:", book.title);
    const newAuthor = prompt("Masukkan penulis baru:", book.author);
    
    if (newTitle && newAuthor) {
      alert("Fitur edit belum diimplementasikan di context!");
      // NANTI KITA IMPLEMENTASIKAN: editBook(book.id, { title: newTitle, author: newAuthor });
    }
  };

  // Helper untuk mengubah 'milik' -> 'Sudah Dimiliki'
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