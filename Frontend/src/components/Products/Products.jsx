import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext/ProductContext";
import { useNavigate } from "react-router-dom";

const ProductCarousel = () => {

  const navigate = useNavigate();
  // Get product data from context
  const { productDetails } = useContext(ProductContext);

  // Filter products to only include those with the category "accessories"
  const accessoriesProducts = productDetails.filter(
    (product) => product.category.toLowerCase() === "accessories"
  );

  const navigateToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="max-w-7xl  mx-auto py-[4rem]">
      <h2 className="text-center text-3xl font-bold text-blue-700 mb-6">
        Shop Best Accessories
      </h2>

      {/* Swiper Carousel without buttons but with autoplay */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        autoplay={{ delay: 2000 }} // Keeps auto-scrolling enabled
        pagination={{ clickable: true }} // Keeps dots for navigation
        className="px-5"
      >
        {accessoriesProducts.map((product) => (
          <SwiperSlide
            key={product.id}
            className="flex flex-col items-center p-[1rem] mb-[2.5rem]"
          >
            <img
              onClick={() => navigateToProduct(product._id)}
              src={product.image}
              alt={product.name}
              className="w-40 h-40 object-contain"
            />
            <p className="text-gray-700 font-medium  ">
              {product.brandName}
            </p>
            <p className="text-gray-700 font-medium  ">
              {product.productName}
            </p>
          
            <p className="text-blue-600 font-bold text-lg">Rs.{product.price}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;