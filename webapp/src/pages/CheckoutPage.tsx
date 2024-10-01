import React, { useState } from 'react';
import { BookInCart, useCart } from '../context/CartContext';
import axios from '../axios.config';

interface Order {
  items: BookInCart[];
  total: number;
}

const CheckoutPage: React.FC = () => {
  const { cart } = useCart(); // Access the cart from the CartContext
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Calculate the total price of the cart
  const totalPrice = cart.reduce(
    (total: number, item: { price: number; quantity: number }) => total + item.price * item.quantity,
    0
  );

  const handleOrderSubmit = async () => {
    setIsSubmitting(true);

    // Create the order object to send to the server
    const order: Order = {
      items: cart,
      total: totalPrice,
    };

    try {
      await axios.post('/orders/add', order);

      setOrderSubmitted(true);
    } catch (error) {
      console.error('Failed to submit order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      {/* Cart Summary */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-2 mb-2"
              >
                <div>
                  <h3 className="text-lg">{item.title}</h3>
                  <p className="text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-medium text-lg">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}

            {/* Total Price */}
            <div className="flex justify-between text-lg font-semibold pt-4 border-t">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            {/* Submit Button */}
            {!orderSubmitted ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full mt-6"
                onClick={handleOrderSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting Order...' : 'Submit Order'}
              </button>
            ) : (
              <p className="text-green-500 text-center font-semibold mt-6">
                Order Submitted Successfully!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
