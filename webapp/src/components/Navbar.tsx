import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
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
          {isAuthenticated && (
            <div className='flex gap-4'>
              <li>
                <Link to="/profile" className="text-white hover:text-gray-300">Profile</Link>
              </li>
              <li>
                <button onClick={() => logout()} className="text-white hover:text-gray-300">Logout</button>
              </li>
            </div>
          )}

          {!isAuthenticated && (
            <div className='flex gap-4'>
              <li>
                <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
