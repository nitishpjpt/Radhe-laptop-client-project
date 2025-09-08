import { useState, useEffect, useCallback } from "react";
import { FiTrash2 } from "react-icons/fi";
import {
  AiOutlineSafetyCertificate,
  AiOutlineTruck,
  AiOutlineUndo,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../Context/CartContext/cartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AddToCart = () => {
  const navigate = useNavigate();
  const { cartCount, updateCartCount } = useAppContext();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const navigateToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  // Fetch cart items
  const fetchCartItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("user");
      let items = [];

      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/custumer/cart/all`,
          { customerId: decodedToken.id }
        );
        items = response.data.cart;
      } else {
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        items = guestCart.map((item) => ({
          ...item,
          product: item.product.product || item.product,
        }));
      }

      setCartItems(items);
      updateCartCount(items.reduce((acc, item) => acc + item.quantity, 0));
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, [updateCartCount]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  // Calculate totals whenever cart items change
  useEffect(() => {
    const { price, weight } = cartItems.reduce(
      (acc, item) => {
        if (item.product) {
          acc.price += item.quantity * item.product.price;
          acc.weight += item.quantity * (item.product.weight || 0);
        }
        return acc;
      },
      { price: 0, weight: 0 }
    );

    setTotalPrice(price);
    setTotalWeight(weight.toFixed(2));
  }, [cartItems]);

  // Handle quantity change
  const handleQuantityChange = useCallback(
    async (productId, newQuantity) => {
      if (newQuantity < 1) return;

      try {
        setIsUpdating(true);
        const token = localStorage.getItem("user");
        let updatedItems;

        // Optimistic update
        setCartItems((prev) =>
          prev.map((item) =>
            item.product._id === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );

        if (token) {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          await axios.put(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/custumer/cart/update`,
            {
              customerId: decodedToken.id,
              productId,
              quantity: newQuantity,
            }
          );
        } else {
          const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
          updatedItems = guestCart.map((item) => {
            const actualProduct = item.product.product || item.product;
            return actualProduct._id === productId
              ? { ...item, quantity: newQuantity }
              : item;
          });
          localStorage.setItem("guestCart", JSON.stringify(updatedItems));
        }

        // Refresh cart count
        const newCount = cartItems.reduce(
          (acc, item) =>
            acc +
            (item.product._id === productId ? newQuantity : item.quantity),
          0
        );
        updateCartCount(newCount);
      } catch (error) {
        fetchCartItems();
      } finally {
        setIsUpdating(false);
      }
    },
    [cartItems, fetchCartItems, updateCartCount]
  );

  // Handle remove item
  const handleRemoveItem = useCallback(
    async (productId) => {
      try {
        setIsUpdating(true);
        const token = localStorage.getItem("user");
        let updatedItems;

        // Optimistic update
        setCartItems((prev) =>
          prev.filter((item) => item.product._id !== productId)
        );

        if (token) {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          await axios.delete(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/custumer/cart/remove/${productId}`,
            { data: { customerId: decodedToken.id } }
          );
        } else {
          const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
          updatedItems = guestCart.filter((item) => {
            const actualProduct = item.product.product || item.product;
            return actualProduct._id !== productId;
          });
          localStorage.setItem("guestCart", JSON.stringify(updatedItems));
        }

        // Update global cart count
        const newCount = cartItems.reduce(
          (acc, item) =>
            acc + (item.product._id === productId ? 0 : item.quantity),
          0
        );
        updateCartCount(newCount);

        toast.success("Item removed from cart");
      } catch (error) {
        toast.error("Failed to remove item");
        fetchCartItems();
      } finally {
        setIsUpdating(false);
      }
    },
    [cartItems, fetchCartItems, updateCartCount]
  );

  // Handle input change with validation
  const handleInputChange = (productId, e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      handleQuantityChange(productId, value);
    }
  };

  const checkoutPage = () => {
    navigate("/checkout");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Shopping Cart
          </h1>
          <p className="mt-2 text-gray-600">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your
            cart
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="space-y-8">
            {/* Product Cards */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.product._id}
                  className="flex  flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
                >
                  <div className="flex items-start sm:items-center gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
                    <div className="relative">
                      <img
                      onClick={() => navigateToProduct(item.product._id)}
                        src={item.product.image}
                        alt={item.product.productName}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-200"
                      />
                      {item.quantity > 1 && (
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                          {item.quantity}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.product.productName}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Rs. {item.product.price.toLocaleString()}
                      </p>
                      {item.product.weight && (
                        <p className="text-sm text-gray-500 mt-1">
                          Weight: {item.product.weight}g
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <button
                        className="px-3 py-2 bg-white hover:bg-gray-100 text-gray-700 transition-colors duration-150 disabled:opacity-50"
                        onClick={() =>
                          handleQuantityChange(
                            item.product._id,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1 || isUpdating}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="w-12 text-center outline-none bg-white border-x border-gray-200 py-2"
                        value={item.quantity}
                        min={1}
                        onChange={(e) => handleInputChange(item.product._id, e)}
                        disabled={isUpdating}
                      />
                      <button
                        className="px-3 py-2 bg-white hover:bg-gray-100 text-gray-700 transition-colors duration-150 disabled:opacity-50"
                        onClick={() =>
                          handleQuantityChange(
                            item.product._id,
                            item.quantity + 1
                          )
                        }
                        disabled={isUpdating}
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4 ml-4">
                      <p className="text-lg font-semibold text-gray-900 whitespace-nowrap">
                        Rs.
                        {(item.quantity * item.product.price).toLocaleString()}
                      </p>
                      <button
                        className="text-gray-400 hover:text-red-500 transition-colors duration-150 p-1"
                        onClick={() => handleRemoveItem(item.product._id)}
                        disabled={isUpdating}
                        aria-label="Remove item"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary and Policies Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Shopping Policies Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Shopping Policies
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-blue-600">
                      <AiOutlineSafetyCertificate className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Security Policy
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Your payment information is processed securely.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-blue-600">
                      <AiOutlineTruck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Delivery Policy
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Standard delivery within 3-5 business days.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-blue-600">
                      <AiOutlineUndo className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Return Policy
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        30-day return policy for unused items.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Order Summary Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      Rs.{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-900">Free</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      Rs.{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={checkoutPage}
                  disabled={cartItems.length === 0 || isUpdating}
                  className={`w-full mt-6 py-3 px-4 rounded-lg font-medium transition-colors duration-150 ${
                    cartItems.length === 0 || isUpdating
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {isUpdating ? "Processing..." : "Proceed to Checkout"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center max-w-2xl mx-auto border border-gray-100">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link
              to="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-150"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
