import React, { useContext, useState } from "react";
import {
  FaArrowRight,
  FaCartPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { ProductContext } from "../../Context/ProductContext/ProductContext";
import promoImg from "../../assets/banner-img.png";
import { Link } from "react-router-dom";

const ValueOffers = () => {
  const { productDetails } = useContext(ProductContext);

  const accessoriesProducts = productDetails.filter(
    (product) => product.category?.toLowerCase() === "laptops"
  );

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 2;

  const handleNext = () => {
    setStartIndex((prev) => (prev + itemsPerPage) % accessoriesProducts.length);
  };

  const handlePrev = () => {
    setStartIndex(
      (prev) =>
        (prev - itemsPerPage + accessoriesProducts.length) %
        accessoriesProducts.length
    );
  };

  const visibleProducts = [
    accessoriesProducts[startIndex],
    accessoriesProducts[(startIndex + 1) % accessoriesProducts.length],
  ];

  return (
    <>
      <div className="bg-[#f4f1fd] ">
        <div className="flex justify-center px-4 sm:px-10 md:px-20 lg:px-[28rem]">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl pt-10 text-center">
            Valued Offers
          </h1>
        </div>

        {/* Main Container */}
        <div className="flex flex-col items-center justify-center md:flex-row p-4 sm:p-6 md:p-12 gap-6">
          {/* Promo Banner */}
          <div className="bg-[#FFD54F] rounded-2xl w-full md:w-1/3 p-6 flex flex-col justify-between">
            <img
              src={promoImg}
              alt="Laptop Promo"
              className="w-full h-48 sm:h-60 md:h-72 object-contain"
            />
            <div className="mt-6 text-black">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                Get 20% off on latest laptops
              </h2>
              <button className="mt-4 bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm hover:bg-gray-900">
                 <Link to="/products">Find Now</Link> <FaArrowRight />
              </button>
            </div>
          </div>

          {/* Product Cards Area */}
          <div className=" bg-white rounded-2xl p-6 relative overflow-hidden">
            {/* Arrow Controls */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button
                onClick={handlePrev}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border rounded-full hover:bg-gray-100"
              >
                <FaChevronLeft className="text-xl sm:text-2xl" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border rounded-full hover:bg-gray-100"
              >
                <FaChevronRight className="text-xl sm:text-2xl" />
              </button>
            </div>

            {/* Cards */}
            <div className="mt-16 flex gap-4 justify-start flex-wrap md:flex-nowrap overflow-x-auto scrollbar-hide">
              {visibleProducts.map((product, index) => (
                <div
                  key={`${product?._id}-${index}`}
                  className="border-2 border-gray-300 min-w-[230px] max-w-[260px] rounded-3xl flex-shrink-0 flex flex-col items-center relative bg-white"
                >
                  <div className="w-full h-48 sm:h-56 flex items-center justify-center rounded-t-3xl bg-[#F2F2F2] relative">
                    <img
                      src={product?.image || promoImg}
                      alt={product?.title}
                      className="w-full h-full object-contain p-4"
                    />
                    {product?.onSale && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                        Sale
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {product?.brandName || "Uncategorized"}
                  </p>
                  <h3 className="text-sm font-semibold mt-1 text-center px-2">
                    {product?.title}
                  </h3>
                  <div className="text-sm mt-2">
                    {product?.oldPrice && (
                      <span className="line-through text-red-400 text-xs mr-2">
                        Rs.{product.oldPrice}
                      </span>
                    )}
                    <span className="font-semibold">Rs.{product?.price}</span>
                  </div>
                  <button className="mt-4 mb-4 bg-gray-200 hover:bg-gray-300 transition-all text-sm font-medium py-2 px-4 rounded-full flex items-center justify-center gap-2">
                    <FaCartPlus /> Add To Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ValueOffers;
