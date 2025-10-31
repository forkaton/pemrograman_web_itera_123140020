// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Navbar from './components/Navbar/Navbar';
import './App.css'; // Kita akan isi file App.css

function App() {
  return (
    <BrowserRouter> {/* 1. Bungkus semua dengan BrowserRouter */}
      <Navbar /> {/* 2. Tampilkan Navbar di setiap halaman */}

      {/* 3. Definisikan area konten utama */}
      <main className="main-content">
        <Routes> {/* 4. Tentukan rute-rute Anda */}
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;