import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Create the context
const WishlistContext = createContext();

// Create a provider component
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Helper function to get the logged-in customer's ID
  const getLoggedInCustomerId = () => {
    const token = localStorage.getItem("user");
    if (!token) return null;

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken.id;
    } catch (err) {
      console.error("Invalid token:", err);
      return null;
    }
  };

  // Fetch the wishlist when the component mounts
  useEffect(() => {
    const fetchWishlist = async () => {
      const customerId = getLoggedInCustomerId();
      if (!customerId) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/whitelist/${customerId}`,
          { withCredentials: true }
        );
        setWishlist(response.data.whitelist); // Update the wishlist state
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  // Add a product to the wishlist
  const addToWishlist = async (productId) => {
    const customerId = getLoggedInCustomerId();
    if (!customerId) {
      toast.error("Please log in to add products to your wishlist.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/whitelist/add`,
        { customerId, productId },
        { withCredentials: true }
      );
      setWishlist(response.data.whitelist); // Update the wishlist state
      toast.success("Product added to wishlist");
    } catch (error) {
      toast.error("Error adding to wishlist. Please try again.");
      console.error("Error adding to wishlist:", error.response?.data?.message || error.message);
    }
  };

  // Remove a product from the wishlist
  const removeFromWishlist = async (productId) => {
    const customerId = getLoggedInCustomerId();
    if (!customerId) {
      toast.error("Please log in to remove products from your wishlist.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/whitelist/remove`,
        { customerId, productId },
        { withCredentials: true }
      );
      setWishlist(response.data.whitelist); // Update the wishlist state
      toast.success("Product removed from wishlist");
    } catch (error) {
      toast.error("Error removing from wishlist. Please try again.");
      console.error("Error removing from wishlist:", error.response?.data?.message || error.message);
    }
  };

  // Check if a product is in the wishlist
  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item.product._id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isProductInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use the WishlistContext
export const useWishlist = () => useContext(WishlistContext);