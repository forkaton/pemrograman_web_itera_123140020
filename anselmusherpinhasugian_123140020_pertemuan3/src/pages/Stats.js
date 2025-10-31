// src/pages/Stats.js
import React from 'react';
import { useBookStats } from '../hooks/useBookStats';
import './Stats.css'; // Kita akan buat file CSS ini

// Ini adalah komponen internal kecil untuk tampilan (Reusable Component #5)
const StatCard = ({ title, value, className }) => {
  return (
    <div className={`stat-card ${className || ''}`}>
      <h3 className="stat-value">{value}</h3>
      <p className="stat-title">{title}</p>
    </div>
  );
};

const Stats = () => {
  // Panggil custom hook kita!
  const { totalBooks, totalOwned, totalReading, totalToBuy } = useBookStats();

  return (
    <div className="stats-page-container">
      <h2>Statistik Bukumu</h2>
      <div className="stats-grid">
        <StatCard title="Total Buku" value={totalBooks} className="card-total" />
        <StatCard title="Sudah Dimiliki" value={totalOwned} className="card-milik" />
        <StatCard title="Sedang Dibaca" value={totalReading} className="card-baca" />
        <StatCard title="Ingin Dibeli" value={totalToBuy} className="card-beli" />
      </div>
    </div>
  );
};

export default Stats;