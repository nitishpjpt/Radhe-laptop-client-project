import React, { useState, useEffect } from "react";
import {
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiPercent,
  FiShoppingCart,
  FiFileText,
  FiTag,
} from "react-icons/fi";

const cardsData = [
  {
    icon: <FiPercent size={32} />,
    title: "Great deals in every month",
    description: "Lorem ipsum dolor sit amet consectetur Lacinia gravida penatibus.",
  },
  {
    icon: <FiShoppingCart size={32} />,
    title: "Easy return policy for all products",
    description: "Lorem ipsum dolor sit amet consectetur Lacinia gravida penatibus.",
  },
  {
    icon: <FiFileText size={32} />,
    title: "Pay over time, interest-free.",
    description: "Lorem ipsum dolor sit amet consectetur Lacinia gravida penatibus.",
  },
  {
    icon: <FiTag size={32} />,
    title: "Best prices and offers",
    description: "Lorem ipsum dolor sit amet consectetur Lacinia gravida penatibus.",
  },
  {
    icon: <FiShoppingCart size={32} />,
    title: "Special festive discounts",
    description: "Lorem ipsum dolor sit amet consectetur Lacinia gravida penatibus.",
  },
  {
    icon: <FiPercent size={32} />,
    title: "Exclusive membership offers",
    description: "Lorem ipsum dolor sit amet consectetur Lacinia gravida penatibus.",
  },
];

const WhyBestPlace = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const visibleCards = isMobile ? 1 : 4;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - visibleCards + cardsData.length) % cardsData.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + visibleCards) % cardsData.length);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < visibleCards; i++) {
      const index = (currentIndex + i) % cardsData.length;
      cards.push(cardsData[index]);
    }
    return cards;
  };

  return (
    <div className="bg-[#F8FFEC] mt-[7rem] w-full">
      <div className="py-20 px-4 sm:px-10 md:px-20 mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-7 flex-wrap gap-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Why we are the best place to buy.
          </h2>
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        {/* Cards Display */}
        <div
          className={`${
            isMobile ? "block" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          } gap-6 transition-all duration-500`}
        >
          {getVisibleCards().map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border shadow p-6 min-h-[300px] flex flex-col justify-between"
            >
              <div>
                <div className="text-black mb-4">{card.icon}</div>
                <h3 className="text-xl font-extrabold mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.description}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <FiArrowUpRight className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyBestPlace;
