// src/components/BookForm/BookForm.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { BookProvider } from '../../context/BookContext';
import BookForm from './BookForm';

// Kita butuh wrapper <BookProvider> karena BookForm menggunakan hook 'useBooks'
const renderWithContext = (ui) => {
  return render(ui, { wrapper: BookProvider });
};

// Ini adalah Test Unit #3
test('shows error message on empty submit', () => {
  renderWithContext(<BookForm />);
  
  // Cari tombol "Tambah Buku"
  const submitButton = screen.getByRole('button', { name: /Tambah Buku/i });
  
  // Klik tombol tersebut tanpa mengisi form
  fireEvent.click(submitButton);
  
  // Cek apakah pesan error yang kita buat di Tahap 6 muncul
  expect(screen.getByText(/Judul dan Penulis wajib diisi!/i)).toBeInTheDocument();
});