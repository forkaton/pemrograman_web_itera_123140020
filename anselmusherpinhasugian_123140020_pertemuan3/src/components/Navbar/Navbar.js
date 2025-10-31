import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <h1 className="navbar-title">BukuNeon</h1>
      <div className="navbar-links">
        {/* Link ini akan mengarahkan ke halaman yang kita atur di App.js nanti */}
        <Link to="/">Beranda</Link>
        <Link to="/stats">Statistik</Link>
      </div>
    </nav>
  );
};

export default Navbar;