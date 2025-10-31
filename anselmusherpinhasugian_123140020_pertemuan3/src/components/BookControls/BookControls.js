import React from 'react';
import { useBooks } from '../../context/BookContext';
import './BookControls.css';

const BookControls = () => {
  const { filter, setFilter, searchQuery, setSearchQuery } = useBooks();

  return (
    <div className="controls-container">
      {/* Fitur Pencarian Buku */}
      <div className="search-bar">
        <input 
          type="text"
          placeholder="Cari buku berdasarkan judul atau penulis..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Fitur Filter Buku */}
      <div className="filter-buttons">
        <button onClick={() => setFilter('semua')} className={filter === 'semua' ? 'active' : ''}>Semua</button>
        <button onClick={() => setFilter('milik')} className={filter === 'milik' ? 'active' : ''}>Milik</button>
        <button onClick={() => setFilter('baca')} className={filter === 'baca' ? 'active' : ''}>Dibaca</button>
        <button onClick={() => setFilter('beli')} className={filter === 'beli' ? 'active' : ''}>Ingin Beli</button>
      </div>
    </div>
  );
};

export default BookControls;