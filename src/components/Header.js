import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Restaurant</h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/dishes" className="hover:text-yellow-400">Dishes</Link>
          <Link to="/orders" className="hover:text-yellow-400">Orders</Link>
          <Link to="/profile" className="hover:text-yellow-400">Profile</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;

