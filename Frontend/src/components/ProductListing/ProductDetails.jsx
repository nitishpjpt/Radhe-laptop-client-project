import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FiShoppingCart, FiArrowLeft, FiChevronRight } from "react-icons/fi";
import { BsCartCheck } from "react-icons/bs";
import SecondBanner from "../secondBanner/SecondBanner";
import { FaCheckCircle } from "react-icons/fa";
import { useAppContext } from "../../Context/CartContext/cartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { fetchCartItems, fetchWishlistItems } = useAppContext();

  // Get all products passed from ProductListing component
  const allProducts = location.state?.products || [];
  //  console.log("All Products:", allProducts);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/product/product/${id}`
        );
        setProduct(response.data.product || []);
        setLoading(false);

        // Find related products from the passed products data
        if (allProducts.length > 0) {
          const related = allProducts
            .filter(
              (p) =>
                p._id !== id && p.category === response.data.product.category
            )
            .slice(0, 4); // Show max 4 related products
          setRelatedProducts(related);
        }
        // console.log("Related Products:", relatedProducts);
      } catch (err) {
        setError(err.message || "Product not found");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, allProducts]);

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("user");
    const productId = id;

    if (!productId) {
      toast.error("Product ID is missing.");
      return;
    }

    if (!token) {
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const existingItem = guestCart.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        try {
          const productResponse = await axios.get(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/product/product/${productId}`
          );
          const product = productResponse.data;

          if (!product) {
            throw new Error("Product not found");
          }

          guestCart.push({
            productId,
            quantity,
            product,
          });

          // After successful add:
          await fetchCartItems();
          toast.success("Product added to cart!");
          localStorage.setItem("guestCart", JSON.stringify(guestCart));
        } catch (error) {
          console.error("Error fetching product details:", error);
          toast.error("Failed to add product to cart.");
        }
      }
    } else {
      const decodedToken = decodeToken(token);
      const customerId = decodedToken?.id;

      if (!customerId) {
        toast.error("Please log in again.");
        return;
      }

      try {
        await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/custumer/cart/add`,
          { customerId, productId, quantity },
          { headers: { "Content-Type": "application/json" } }
        );
         // After successful add:
          await fetchCartItems();
        toast.success("Product added to cart!");
      } catch (error) {
        console.error("Add to cart error:", error);
        toast.error("Failed to add product to cart.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Breadcrumb Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-indigo-600">
                Home
              </Link>
              <FiChevronRight className="h-4 w-4" />
              <Link to="/products" className="hover:text-indigo-600">
                Products
              </Link>
              <FiChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium">
                {product?.productName}
              </span>
            </div>
          </div>
        </nav>

     {/* Product Section */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <div className="bg-white rounded-3xl shadow-md overflow-hidden">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
      {/* Product Image */}
      <div className="flex flex-col">
        <div className="flex-1 bg-gray-100 rounded-3xl overflow-hidden flex items-center justify-center p-8">
          <img
            src={product?.image}
            alt={product?.productName}
            className="w-full h-auto max-h-96 object-contain"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-4 bg-[#F3F2FB] p-6 rounded-3xl">
        <div>
          <h2 className="text-sm font-medium text-gray-500">
            Product Name
          </h2>
          <h1 className="text-3xl font-bold text-gray-900">
            {product?.productName}
          </h1>

          <h2 className="text-sm font-medium text-gray-500 mt-4">
            Brand
          </h2>
          <p className="text-lg text-indigo-600 font-medium">
            {product?.brandName}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500">Price</h2>
          <p className="text-3xl font-bold text-gray-900">
            Rs. {product?.price}
          </p>
        </div>

        {/* Key Features (Short Description) */}
        {product?.shortDescription?.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-sm font-medium text-gray-500 mb-2">
              Key Features
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              {product.shortDescription.map((feature, index) => (
                <li key={index} className="text-gray-700">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Long Description */}
        {product?.longDescription && (
          <div className="border-t border-gray-200 py-6">
            <h2 className="text-sm font-medium text-gray-500">
              Description
            </h2>
            <p className="text-gray-700 whitespace-pre-line mt-2">
              {product.longDescription}
            </p>
          </div>
        )}

        {/* Category & Subcategory */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-sm font-medium text-gray-500 mb-2">
            Category
          </h2>
          <div className="flex space-x-4">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
              {product?.category}
            </span>
            {product?.subcategory && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {product.subcategory}
              </span>
            )}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-sm font-medium text-gray-500 mb-2">
            Quantity
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-3 py-1 border-x border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md transition-colors"
          >
            <FiShoppingCart className="mr-2" />
            Add to Cart
          </button>
          <Link
            to="/add-to-cart"
            className="flex-1 flex items-center justify-center bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-3 px-6 rounded-md transition-colors"
          >
            <BsCartCheck className="mr-2" />
            View Cart
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link
                    to={`/product/${product._id}`}
                    state={{ products: allProducts }}
                    className="block"
                  >
                    <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                      <img
                        src={product.image}
                        alt={product.productName}
                        className="h-full object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {product.brandName}
                      </h3>
                      <h4 className="text-md text-gray-600">
                        {product.productName}
                      </h4>
                      <p className="text-indigo-600 font-bold mt-2">
                        Rs. {product.price}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <SecondBanner />
    </>
  );
};

export default ProductDetail;
