import books from '../data/books.json';
import connectDB from '../../config/db';
import Book from '../../models/Book';

const seedBooks = async () => {
  await Book.deleteMany(); // Clear existing books
  await Book.insertMany(books); // Insert new books
  console.log('Books seeded!');
  process.exit();
};

connectDB().then(seedBooks);
