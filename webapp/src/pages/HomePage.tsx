import React from 'react';
import BookList from '../components/BookList';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Our Bookstore</h1>
      <BookList />
    </div>
  );
};

export default HomePage;
