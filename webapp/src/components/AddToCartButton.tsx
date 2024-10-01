import { Book, useCart } from "../context/CartContext"
import { useNotification } from "../context/NotificationContext";


const AddToCartButton: React.FC<{ book: Book }> = ({ book }) => {
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  const handleAddToCart = (book: Book) => {
    showNotification(`Book ${book.title} is added to cart.`)
    addToCart(book);
  };

  return (
    <button
      onClick={() => handleAddToCart(book)}
      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
    >
      Add to Cart
    </button>
  )
}

export default AddToCartButton;
