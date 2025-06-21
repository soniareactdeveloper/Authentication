import React, { useState } from 'react';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router'; 

const Navbar = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-r from-[#e6ffe6] via-[#d2f4ef] to-[#f0fff4] shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-bold text-[#0A2A3C]">
          <FaUserCircle className="text-2xl text-[#11C0D4]" />
          <Link to="/" className="hover:text-[#5b8506] transition">Auth Portal</Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-[#0A2A3C] font-medium">
          <li><Link to="/" className="hover:text-[#11C0D4] transition">Home</Link></li>
          <li><Link to="/about" className="hover:text-[#11C0D4] transition">About</Link></li>
          <li><Link to="/contact" className="hover:text-[#11C0D4] transition">Contact</Link></li>
          {!user && (
            <>
              <li><Link to="/login" className="hover:text-[#5b8506] transition">Login</Link></li>
              <li><Link to="/register" className="hover:text-[#5b8506] transition">Register</Link></li>
            </>
          )}
        </ul>

        {/* User info & Logout on desktop */}
        {user && (
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-xs text-[#2b3911]">{user.fullname}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
              {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#06853d] text-white flex items-center justify-center text-lg font-semibold">
                    {user.fullname?.charAt(0).toUpperCase()}
                  </div>
                )}

            <button
              onClick={onLogout}
              className="bg-[#0A2A3C] text-white px-4 py-1.5 rounded hover:bg-[#5b8506] transition text-sm font-medium"
            >
              Logout
            </button>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-[#0A2A3C]"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-[#e6ffe6] via-[#d2f4ef] to-[#f0fff4] shadow-md px-6 py-4">
          <ul className="flex flex-col gap-4 text-[#0A2A3C] font-medium">
            <li><Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-[#11C0D4]">Home</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-[#11C0D4]">About</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-[#11C0D4]">Contact</Link></li>
            {!user ? (
              <>
                <li><Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-[#5b8506]">Login</Link></li>
                <li><Link to="/register" onClick={() => setMenuOpen(false)} className="hover:text-[#5b8506]">Register</Link></li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2">
                  <img src={user.image} alt="User" className="w-8 h-8 rounded-full border-2 border-[#11C0D4]" />
                  <div>
                    <p className="font-semibold text-[#5b8506]">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onLogout();
                      setMenuOpen(false);
                    }}
                    className="bg-[#0A2A3C] text-white w-full py-2 rounded hover:bg-[#5b8506] transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
