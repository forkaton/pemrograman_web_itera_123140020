import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import './BookForm.css';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('beli'); // Default status
  const [error, setError] = useState('');
  
  const { addBook } = useBooks(); // Ambil fungsi addBook dari Context

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Error Handling Sederhana (Persyaratan Teknis)
    if (!title || !author) {
      setError('Judul dan Penulis wajib diisi!');
      return; // Hentikan fungsi jika error
    }
    
    // Jika lolos validasi, tambahkan buku
    addBook({ title, author, status });
    
    // Reset form
    setTitle('');
    setAuthor('');
    setStatus('beli');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h3>Tambah Buku Baru</h3>
      {/* Tampilkan pesan error jika ada */}
      {error && <p className="form-error">{error}</p>}
      
      <div className="form-group">
        <label>Judul Buku</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Contoh: Belajar React"
        />
      </div>
      <div className="form-group">
        <label>Penulis</label>
        <input 
          type="text" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
          placeholder="Contoh: Anselmus Herpin"
        />
      </div>
      <div className="form-group">
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="beli">Ingin Dibeli</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="milik">Sudah Dimiliki</option>
        </select>
      </div>
      <button type="submit">Tambah Buku</button>
    </form>
  );
};

export default BookForm;