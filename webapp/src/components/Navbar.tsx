import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
          <Link to="/">Bookstore</Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/cart" className="text-white hover:text-gray-300">Cart</Link>
          </li>
          <li>
            <Link to="/profile" className="text-white hover:text-gray-300">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
