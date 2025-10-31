// src/components/Navbar/Navbar.test.js
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

// Kita butuh wrapper <BrowserRouter> karena Navbar mengandung komponen <Link>
const renderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

// Ini adalah Test Unit #1
test('renders navbar links correctly', () => {
  renderWithRouter(<Navbar />);
  
  // Cek apakah link "Beranda" ada di dokumen
  expect(screen.getByText(/Beranda/i)).toBeInTheDocument();
  
  // Cek apakah link "Statistik" ada di dokumen
  expect(screen.getByText(/Statistik/i)).toBeInTheDocument();
});

// Ini adalah Test Unit #2
test('renders navbar title "BukuNeon"', () => {
    renderWithRouter(<Navbar />);
    
    // Cek apakah judul "BukuNeon" ada
    expect(screen.getByText(/BukuNeon/i)).toBeInTheDocument();
});