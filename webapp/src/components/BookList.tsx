import React, { useEffect, useState } from 'react';
import axios from '../axios.config';
import BookItem from './BookItem';

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  coverImage: string; // Add a property for the cover image
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios().get('/books');
      setBooks(response.data);
    };

    fetchBooks();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {books.map((book) => (
        <BookItem key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
