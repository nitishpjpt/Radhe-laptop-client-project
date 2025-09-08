import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GrZoomIn } from "react-icons/gr";
import { PiHeartStraightBold, PiHeartStraightFill } from "react-icons/pi";
import { AiOutlineClose, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAppContext } from "../../Context/CartContext/cartContext";
import toast from "react-hot-toast";

const ProductListing = ({ products }) => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [whitelist, setWhitelist] = useState([]);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const { fetchWishlistItems } = useAppContext();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserRole(decodedToken.role);
      fetchWhitelist(decodedToken.id);
    }
  }, []);

  const fetchWhitelist = async (customerId) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/whitelist/${customerId}`,
        { withCredentials: true }
      );
      setWhitelist(response.data.whitelist);
    } catch (error) {
      console.error("Error fetching whitelist:", error);
    }
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`, { state: { products } });
  };

  const handleAddToCart = (product) => setSelectedProduct(product);

  const closeModal = () => setSelectedProduct(null);

  const handleEditProduct = (product) => setEditingProduct(product);

  const handleSaveProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("brandName", editingProduct.brandName);
      formData.append("productName", editingProduct.productName);
      formData.append("price", editingProduct.price);
      formData.append("description", editingProduct.description);

      if (editingProduct.image) {
        formData.append("image", editingProduct.image);
      }

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product/${
          editingProduct._id
        }`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Product updated successfully");
        setEditingProduct(null);
        window.location.reload();
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          alert("Product deleted successfully");
          window.location.reload();
        } else {
          alert("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

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

  const isProductInWhitelist = (productId) => {
    return whitelist.some((item) => item.product?._id === productId);
  };

  const addToWhitelist = async (productId) => {
    const customerId = getLoggedInCustomerId();
    if (!customerId) {
      toast.error("Please log in to add products to your wishlist");
      return;
    }

    try {
      // Optimistic update
      setWhitelist((prev) => [
        ...prev,
        { product: products.find((p) => p._id === productId) },
      ]);

      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/whitelist/add`,
        { customerId, productId },
        { withCredentials: true }
      );

      // Verify with server
      const updatedWhitelist = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/whitelist/${customerId}`,
        { withCredentials: true }
      );
      setWhitelist(updatedWhitelist.data.whitelist);

      await fetchWishlistItems();
      toast.success("Product added to wishlist!");
    } catch (error) {
      // Revert optimistic update on error
      setWhitelist((prev) =>
        prev.filter((item) => item.product?._id !== productId)
      );

      console.error(
        "Error adding to whitelist:",
        error.response?.data?.message || error.message
      );
      toast.error(
        error.response?.data?.message || "Failed to add product to wishlist"
      );
    }
  };

  const removeFromWhitelist = async (productId) => {
    const customerId = getLoggedInCustomerId();
    if (!customerId) {
      toast.error("Please log in to manage your wishlist");
      return;
    }

    try {
      // Optimistic update
      setWhitelist((prev) =>
        prev.filter((item) => item.product?._id !== productId)
      );

      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/whitelist/remove`,
        { customerId, productId },
        { withCredentials: true }
      );
      // Verify with server
      const updatedWhitelist = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/whitelist/${customerId}`,
        { withCredentials: true }
      );
      setWhitelist(updatedWhitelist.data.whitelist);

      await fetchWishlistItems();
      toast.success("Product removed from wishlist!");
    } catch (error) {
      // Revert optimistic update on error
      setWhitelist((prev) => [
        ...prev,
        { product: products.find((p) => p._id === productId) },
      ]);

      console.error("Error removing from whitelist:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to remove product from wishlist"
      );
    }
  };

  const toggleWhitelist = async (productId) => {
    if (isWishlistLoading) return;
    setIsWishlistLoading(true);

    try {
      if (isProductInWhitelist(productId)) {
        await removeFromWhitelist(productId);
      } else {
        await addToWhitelist(productId);
      }
    } finally {
      setIsWishlistLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#F2F4FF] py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-black mb-4">Our Collections</h1>
        <p className="text-xl text-gray-500">
          Discover our premium selection of products
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No products found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Admin Controls */}
                {userRole === "admin" && (
                  <div className="absolute top-3 left-3 z-10 flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-2 bg-white rounded-full shadow-md text-green-600 hover:bg-green-50 transition-colors"
                      aria-label="Edit product"
                    >
                      <AiOutlineEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="p-2 bg-white rounded-full shadow-md text-red-600 hover:bg-red-50 transition-colors"
                      aria-label="Delete product"
                    >
                      <AiOutlineDelete className="h-5 w-5" />
                    </button>
                  </div>
                )}

                {/* Product Image */}
                <div className="relative h-80 overflow-hidden bg-gray-100">
                  <Link
                    to={`/product/${product._id}`}
                    state={{ products }}
                    className="w-full h-full"
                  >
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* Quick View */}
                  <Link
                    to={`/product/${product._id}`}
                    state={{ products }}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md text-gray-700 hover:bg-gray-100 transition-colors"
                    aria-label="Quick view"
                  >
                    <GrZoomIn className="h-5 w-5" />
                  </Link>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWhitelist(product._id)}
                    disabled={isWishlistLoading}
                    className="absolute top-14 right-3 p-2 bg-white rounded-full shadow-md transition-colors"
                    aria-label={
                      isProductInWhitelist(product._id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    {isProductInWhitelist(product._id) ? (
                      <PiHeartStraightFill className="h-5 w-5 text-red-500" />
                    ) : (
                      <PiHeartStraightBold className="h-5 w-5 text-gray-700 hover:text-red-500" />
                    )}
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {product.brandName}
                    </h3>
                    <p className="text-lg font-semibold text-indigo-600">
                      Rs.{product.price}
                    </p>
                  </div>
                  <h4 className="mt-1 text-sm text-gray-600">
                    {product.productName}
                  </h4>

                  <button
                    className="mt-4 w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add to Cart Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-gray-900">
                  Added to Cart
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <AiOutlineClose className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-6 flex flex-col items-center">
                <div className="bg-green-50 rounded-full p-3 mb-4">
                  <svg
                    className="h-8 w-8 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.productName}
                  className="h-40 object-contain mb-4"
                />

                <h3 className="text-lg font-medium text-gray-900">
                  {selectedProduct.productName}
                </h3>
                <p className="text-indigo-600 font-bold mt-1">
                  Rs.{selectedProduct.price}
                </p>
                <p className="text-gray-500 text-sm mt-1">Quantity: 1</p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3">
                <Link
                  to={`/product/${selectedProduct._id}`}
                  state={{ products }}
                  className="w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors text-center"
                >
                  View Product
                </Link>
                <button
                  onClick={closeModal}
                  className="w-full bg-white py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-gray-900">
                  Edit Product
                </h2>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <AiOutlineClose className="h-6 w-6" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveProduct();
                }}
                encType="multipart/form-data"
                className="mt-6 space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    name="brandName"
                    value={editingProduct.brandName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={editingProduct.productName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={editingProduct.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={editingProduct.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => {
                      setEditingProduct((prev) => ({
                        ...prev,
                        image: e.target.files[0],
                      }));
                    }}
                    className="w-full px-3 py-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
