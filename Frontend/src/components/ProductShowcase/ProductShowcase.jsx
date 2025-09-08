import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import laptop1 from "../../assets/banner-img.png";
import laptop2 from "../../assets/banner-img2.png";
import laptop3 from "../../assets/banner-img2.png";
import { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const ProductShowcase = () => {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const { productDetails } = useContext(ProductContext);

  const accessoriesProducts = productDetails.filter(
    (product) => product.category.toLowerCase() === "laptops"
  );

  const navigateToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const decodeToken = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("user");
    const quantity = 1;

    if (!productId) {
      alert("Product ID is missing.");
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

          if (!product) throw new Error("Product not found");

          guestCart.push({
            productId,
            quantity,
            product,
          });

          toast.success("Product added to cart!");
          localStorage.setItem("guestCart", JSON.stringify(guestCart));
        } catch (error) {
          console.error("Error fetching product details:", error);
          alert("Failed to fetch product details. Please try again.");
        }
      }
    } else {
      const decodedToken = decodeToken(token);
      const customerId = decodedToken?.id;

      if (!customerId) {
        alert("Invalid token. Please log in again.");
        return;
      }

      try {
        await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/custumer/cart/add`,
          { customerId, productId, quantity },
          { headers: { "Content-Type": "application/json" } }
        );
        toast.success("Product added to cart!");
      } catch (error) {
        console.error("Add to cart error:", error);
        alert("Failed to add product to cart. Please try again.");
      }
    }
  };

  return (
    <div className="mx-4 sm:mx-6 lg:mx-10 my-8 sm:my-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Explore the lineup
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["All", "Popular", "New Added"].map((item) => (
              <button
                key={item}
                className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full border text-sm sm:text-base ${
                  filter === item
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {accessoriesProducts.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden flex flex-col items-center relative border border-gray-200 hover:border-gray-300 min-h-[300px] transition-all duration-300 w-full"
            >
              {product.isSale && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-3xl">
                  Sale
                </span>
              )}
              <div className="w-full h-48 sm:h-52 md:h-56 lg:h-60 flex items-center justify-center bg-[#F2F2F2] p-4">
                <img
                  onClick={() => navigateToProduct(product._id)}
                  src={product.image}
                  alt={product.title}
                  className="object-contain h-full w-full cursor-pointer hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 w-full text-center">
                <h3 className="text-base sm:text-lg font-semibold mt-2 line-clamp-2">
                  {product.brandName}
                </h3>
                <div className="flex justify-center gap-2 items-center mt-2">
                  {product.isSale && (
                    <span className="line-through text-xs sm:text-sm text-gray-400">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  <span className="text-base sm:text-lg font-bold text-gray-800">
                    ₹{product.price}
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="mt-3 sm:mt-4 mb-2 bg-gray-200 hover:bg-gray-300 transition-all text-xs sm:text-sm font-medium py-1.5 sm:py-3 px-4 sm:px-6 w-full rounded-full flex items-center justify-center gap-2"
                >
                  <FaCartPlus size={14} /> Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
