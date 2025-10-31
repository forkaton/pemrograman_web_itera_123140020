// src/components/BookList/BookList.test.js
import { render, screen } from '@testing-library/react';
import { BookProvider } from '../../context/BookContext';
import BookList from './BookList';

// Helper untuk me-render dengan Context
// Ini adalah jawaban dari "bagaimana cara merender ini"
const renderWithContext = (ui) => {
  return render(ui, { wrapper: BookProvider });
};

// Ini adalah Test Unit #4
test('shows empty message when no books are available', () => {
  // 1. Render komponen BookList dengan dibungkus BookProvider
  renderWithContext(<BookList />);

  // 2. Cari teks yang seharusnya muncul saat list kosong
  const emptyMessage = screen.getByText(/Tidak ada buku yang ditemukan./i);
  
  // 3. Pastikan teks itu ada di dokumen
  expect(emptyMessage).toBeInTheDocument();
});