import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../context/CartContext';
import AddToCartButton from './AddToCartButton';

const BookItem: React.FC<{ book: Book }> = ({ book }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <img
        src={book.coverImage} // Use the coverImage property
        alt={`${book.title} cover`}
        className="w-full h-48 object-cover rounded-t-lg" // Style the image
      />
      <h2 className="text-xl font-bold mt-2">{book.title}</h2>
      <p className="text-gray-600">By {book.author}</p>
      <p className="text-gray-800 mt-2">${book.price.toFixed(2)}</p>
      <Link to={`/books/${book._id}`} className="block mt-4 text-blue-500 hover:text-blue-400">
        View Details
      </Link>
      <AddToCartButton book={book}/>
    </div>
  );
};

export default BookItem;
