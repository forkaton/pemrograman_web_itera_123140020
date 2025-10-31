// src/components/BookControls/BookControls.test.js
import { render, screen } from '@testing-library/react';
import { BookProvider } from '../../context/BookContext';
import BookControls from './BookControls';

// Helper yang sama untuk me-render dengan Context
const renderWithContext = (ui) => {
  return render(ui, { wrapper: BookProvider });
};

// Ini adalah Test Unit #5
test('renders search bar placeholder correctly', () => {
  // 1. Render komponen BookControls dengan dibungkus BookProvider
  renderWithContext(<BookControls />);
  
  // 2. Cara terbaik untuk mencari input adalah via placeholder-nya
  const searchInput = screen.getByPlaceholderText(/Cari buku berdasarkan judul atau penulis.../i);

  // 3. Pastikan input itu ada di dokumen
  expect(searchInput).toBeInTheDocument();
});