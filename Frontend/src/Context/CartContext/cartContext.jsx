// src/context/AppContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState(null);

  const decodeToken = (token) => {
    if (!token) return null;
    try {
      const [, payload] = token.split(".");
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Initialize user state
  useEffect(() => {
    const token = localStorage.getItem("user");
    const decoded = decodeToken(token);
    if (decoded) setUser(decoded);
  }, []);

  // Fetch cart items count
   const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("user");
      let count = 0;
      
      if (token) {
        const decodedToken = decodeToken(token);
        const customerId = decodedToken?.id;
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/custumer/cart/all`,
          { customerId },
          { headers: { "Content-Type": "application/json" } }
        );
        count = response.data.cart.length;
      } else {
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        count = guestCart.length;
      }
      
      setCartCount(count);
      return count; // Return the count for components that need it
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return cartCount; // Return current count if error
    }
  };


  // Fetch wishlist items count
  const fetchWishlistItems = async () => {
    try {
      const token = localStorage.getItem("user");
      if (token) {
        const decodedToken = decodeToken(token);
        const customerId = decodedToken?.id;
        const response =  await axios.get(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/whitelist/${customerId}`,
                { withCredentials: true }
              );
        setWishlistCount(response.data.whitelist.length);
        console.log("Wishlist items fetched:", response.data.whitelist);
      } else {
        const guestWishlist = JSON.parse(localStorage.getItem("guestWishlist")) || [];
        setWishlistCount(guestWishlist.length);
      }
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    }
  };

    const updateCartCount = (count) => {
    setCartCount(count);
  };
  // Initial fetch of both cart and wishlist
  useEffect(() => {
    fetchCartItems();
    fetchWishlistItems();
  }, [user]); // Refetch when user changes

  return (
    <AppContext.Provider value={{ 
      cartCount, 
      wishlistCount, 
      fetchCartItems, 
      fetchWishlistItems,
       updateCartCount,
      user,
      setUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);