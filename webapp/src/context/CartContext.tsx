import React, { createContext, useContext, useState } from 'react';

export interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  coverImage: string;
}

export interface BookInCart extends Book {
  quantity: number;
}

interface CartContextType {
  cart: BookInCart[];
  addToCart: (book: Book) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<BookInCart[]>([]);

  const addToCart = (book: Book) => {
    const isBookExist = cart.find((item) => item.title === book.title);

    if (isBookExist) {
      const updatedCart = cart.map(item => {
        if (item.title === book.title) {
          item.quantity += 1;
        }
        return item
      });

      setCart(updatedCart);
    } else {
      const addedBook: BookInCart = {
        ...book,
        quantity: 1
      }
      setCart(prevCart => [...prevCart, addedBook]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
