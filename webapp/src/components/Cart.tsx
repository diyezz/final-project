import React from 'react';
import { useCart } from '../context/CartContext'; // Adjust the import path
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart } = useCart(); // Get the cart state from context

  if (cart.length === 0) {
    return <p className="text-center mt-4">Your cart is empty!</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((book) => (
          <div key={book._id} className="border border-gray-200 rounded-lg p-4 flex">
            <img
              src={book.coverImage}
              alt={`${book.title} cover`}
              className="w-24 h-32 object-cover rounded-lg mr-4"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p className="text-gray-600">By {book.author}</p>
              <p className="text-gray-800">${book.price.toFixed(2)}</p>
              <p className="mt-6 text-gray-800">{book.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <Link to="/checkout" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default Cart;
