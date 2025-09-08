import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PiHeartStraightBold, PiHeartStraightFill } from "react-icons/pi"; // Import filled and outline heart icons
import toast, { Toaster } from "react-hot-toast";

const WhitelistPage = () => {
  const [whitelist, setWhitelist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the logged-in customer's ID
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

  // Fetch the whitelist data
  const fetchWhitelist = async () => {
    const customerId = getLoggedInCustomerId();
    if (!customerId) {
      setError("Please log in to view your whitelist.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/whitelist/${customerId}`,
        { withCredentials: true }
      );
      setWhitelist(response.data.whitelist);
      console.log(response.data.whitelist)
    } catch (error) {
      setError("Error fetching whitelist. Please try again later.");
      console.error("Error fetching whitelist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWhitelist();
  }, []);

  // Check if a product is in the whitelist
  const isProductInWhitelist = (productId) => {
    return whitelist.some((item) => item.product._id === productId);
  };

  // Handle product click
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Handle remove from whitelist
  const handleRemoveFromWhitelist = async (productId) => {
    const customerId = getLoggedInCustomerId();
    if (!customerId) {
      toast.error("Please log in to remove products from your wishlist.");
      return;
    }

    // Show a confirmation toast
    toast.custom(
      (t) => (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg font-semibold mb-4">
            Are you sure you want to remove this product from your wishlist?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                toast.dismiss(t.id); // Dismiss the toast
              }}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id); // Dismiss the toast
                try {
                  const response = await axios.post(
                    `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/whitelist/remove`,
                    { customerId, productId },
                    { withCredentials: true }
                  );

                  if (response.status === 200) {
                    toast.success("Product removed from whitelist");
                    fetchWhitelist(); // Refresh the whitelist
                  }
                } catch (error) {
                  toast.error("Error removing from whitelist. Please try again.");
                  console.error("Error removing from whitelist:", error.response?.data?.message || error.message);
                }
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      ),
      { duration: Infinity } // Keep the toast open until the user interacts
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="p-8">
        <div className="flex  justify-center items-center bg-[#F2F4FF] p-10 rounded-md">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Wishlist Products
          </h2>
        </div>
      {whitelist.length === 0 ? (
        <div className="text-center text-gray-500">Your wishlist is empty.</div>
      ) : (
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {whitelist.map((item) => (
            <div
              key={item.product?._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item?.product?.image}
                alt={item.product?.productName}
                className="w-full h-48 object-contain cursor-pointer"
                onClick={() => handleProductClick(item.product?._id)}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{item.product?.brandName}</h2>
                <h3 className="text-lg">{item.product?.productName}</h3>
                <p className="text-blue-600 font-bold">Rs. {item.product?.price}</p>
                <p className="text-sm text-gray-500">
                  Added on: {new Date(item.addedAt).toLocaleDateString()}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the product click
                    handleRemoveFromWhitelist(item.product?._id);
                  }}
                  className="mt-2 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
     
    </div>
  );
};

export default WhitelistPage;