import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios.config';
import AddToCartButton from '../components/AddToCartButton';
import { Book } from '../context/CartContext';

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <img
        src={book.coverImage}
        alt={`${book.title} cover`}
        className="w-full h-64 object-cover rounded-lg mb-4" // Style the image
      />
      <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
      <p className="text-gray-600 mb-2">By {book.author}</p>
      <p className="text-gray-800 mb-4">${book.price.toFixed(2)}</p>
      <p className="text-gray-600">{book.description}</p>

      <AddToCartButton book={book} />
    </div>
  );
};

export default BookDetailsPage;
