import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { toast } from "react-hot-toast";

// Import images
import gamingImg from "../../assets/banner-img.png";
import businessImg from "../../assets/banner-img2.png";
import { ProductContext } from "../../Context/ProductContext/ProductContext";

const products = [
  {
    title: "Gaming Laptops",
    subtitle: "Powerful GPU Series",
    bgColor: "bg-gradient-to-t from-[#bca8f9] to-[#9b5be2]",
    image: gamingImg,
  },
  {
    title: "Business Laptops",
    subtitle: "AI-Powered Series",
    bgColor: "bg-[#f7efe9]",
    image: businessImg,
  },
  {
    title: "UltraBook",
    subtitle: "Next Gen GPU Series",
    bgColor: "bg-[#ffc43d]",
    image: gamingImg,
  },
];

const ProductCards = () => {
  const navigate = useNavigate();
  const { productDetails } = useContext(ProductContext);

  const handleCardClick = (title) => {
  // Define subcategory mappings
  const subcategoryMap = {
    "Gaming Laptops": "gaming",
    "Business Laptops": "business",
    "UltraBook": "ultrabook",
  };

  const subcategory = subcategoryMap[title];

  if (!subcategory) {
    toast.error("This product category is not available yet.");
    return;
  }

  const matchedProduct = productDetails.find(
    (product) =>
      product.category?.toLowerCase() === "laptops" &&
      product.subcategory?.toLowerCase() === subcategory
  );

  if (matchedProduct) {
    navigate(`/product/${matchedProduct._id}`);
  } else {
    toast.error(`No ${subcategory} products found.`);
  }
};


  return (
    <div className="mx-4 sm:mx-6 lg:mx-10 my-8 sm:my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-10">
          Choose best,
          <br />
          See what's new!
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {products.map((item, index) => (
            <div
              key={index}
              className={`${item.bgColor} h-[320px] sm:h-[380px] md:h-[420px] lg:h-[480px] rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-between shadow-md hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex-1 flex justify-center items-center mb-4 sm:mb-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-w-full max-h-[180px] sm:max-h-[220px] md:max-h-[250px] object-contain"
                />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">
                  {item.subtitle}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-black">
                  {item.title}
                </h3>
                <button
                  onClick={() => handleCardClick(item.title)}
                  className="mt-2 sm:mt-3 flex items-center text-xs sm:text-sm text-black font-medium hover:underline"
                >
                  Shop Now <FiArrowUpRight className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
