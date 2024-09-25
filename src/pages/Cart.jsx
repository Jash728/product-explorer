
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity } from "../features/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

 

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row justify-between items-start border-b-2 py-4 gap-4"
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.product_name}
                  className="w-24 h-24 object-cover rounded-md shadow-md"
                />
              )}

              <div className="flex flex-col justify-between w-full gap-2">
                <h3 className="text-lg font-semibold text-gray-800">{item.product_name}</h3>
                <p className="text-sm text-gray-500">{item.categories.split(',').splice(5).join(',')}</p>
                <span className="text-sm text-gray-600">Quantity: {item.quantity || 1}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecreaseQuantity(item.id)}
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-400 transition-colors duration-300"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleIncreaseQuantity(item.id)}
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-400 transition-colors duration-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 w-full md:w-auto"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between mt-6 border-t pt-4">
            <span className="text-lg font-semibold">Total Items: {cartItems.length}</span>
           
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleClearCart}
              className="mt-4 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 w-full md:w-auto"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
