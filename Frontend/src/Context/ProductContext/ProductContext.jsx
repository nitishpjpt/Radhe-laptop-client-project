import axios from "axios";
import { useState, useEffect, createContext } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productDetails, setProductDetails] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product/all`
      );
      setProductDetails(response.data.products || []);
      // console.log(response.data.products);
    } catch (err) {
      console.log(err, "Product not found");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ productDetails}}>
      {children}
    </ProductContext.Provider>
  );
};
