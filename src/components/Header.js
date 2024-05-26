import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
    <header className="text-white p-4 fixed  w-full z-10" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>

      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">THE-CHEF 76</h1>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <nav
          className={`md:flex md:space-x-4 fixed md:static top-0 left-0 w-full md:w-auto bg-black md:bg-transparent transition-transform duration-300 ease-in-out ${
            isOpen ? 'transform translate-y-0' : 'transform -translate-y-full'
          } md:transform-none`}
        >
          {isOpen && (
            <div className="flex justify-between items-center p-4 md:hidden">
              <h1 className="text-xl font-bold">THE-CHEF 76</h1>
              <button onClick={toggleMenu} className="focus:outline-none">
                <FaTimes size={24} />
              </button>
            </div>
          )}
          <Link
            to="/"
            className="block md:inline-block flex items-center hover:text-yellow-400 py-2 md:py-0 px-4"
            onClick={() => setIsOpen(false)}
          >
            Accueil
          </Link>
          <Link
            to="/dishes"
            className="block md:inline-block flex items-center hover:text-yellow-400 py-2 md:py-0 px-4"
            onClick={() => setIsOpen(false)}
          >
            Plats
          </Link>
          <Link
            to="/orders"
            className="block md:inline-block flex items-center hover:text-yellow-400 py-2 md:py-0 px-4"
            onClick={() => setIsOpen(false)}
          >
            Commandes
          </Link>
          <Link
            to="/profile"
            className="block md:inline-block flex items-center hover:text-yellow-400 py-2 md:py-0 px-4"
            onClick={() => setIsOpen(false)}
          >
            Profil
          </Link>
        </nav>
      </div>
    </header>
    </div>
  );
}

export default Header;
