// src/hooks/useBookStats.js
import { useBooks } from '../context/BookContext';

export const useBookStats = () => {
  const { books } = useBooks(); // Ambil list buku mentah (sebelum difilter) dari context

  // Hitung statistik
  const totalBooks = books.length;
  
  const totalOwned = books.filter(
    (book) => book.status === 'milik'
  ).length;
  
  const totalReading = books.filter(
    (book) => book.status === 'baca'
  ).length;
  
  const totalToBuy = books.filter(
    (book) => book.status === 'beli'
  ).length;

  // Kembalikan sebagai objek yang rapi
  return {
    totalBooks,
    totalOwned,
    totalReading,
    totalToBuy,
  };
};