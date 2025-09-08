import React from "react";
import headphonesDark from "../../assets/motherboard2251.png";
import smartWatch from "../../assets/pannel2251.png";

const ProductShowcase = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 sm:p-6 lg:p-8">
      {/* Headphones Section */}
      <div className="bg-[#F1F4FF] p-6 md:p-10 lg:p-16 py-10 rounded-lg flex flex-col relative overflow-hidden">
        <h5 className="text-indigo-600 font-extrabold uppercase text-sm tracking-wide">
          Best Motherboard
        </h5>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2C54] leading-tight mt-2">
          Find your <br /> motherboard!
        </h2>
        <button className="bg-indigo-600 px-6 py-2 w-full sm:w-auto my-4 text-white rounded-lg uppercase text-sm sm:text-base">
          Shop Now
        </button>
        {/* Images */}
        <img
          src={headphonesDark}
          alt="Dark Headphones"
          className="absolute top-3/4 right-4 sm:right-8 md:right-10 lg:right-12 
             transform -translate-y-1/2 w-full 
             max-w-[26vw] md:max-w-[20vw] lg:max-w-[18vw] 
             object-contain"
        />
      </div>

      {/* Smartwatch Section */}
      <div className="bg-[#485AD8] p-6 md:p-10 lg:p-16 text-white rounded-lg flex flex-col relative overflow-hidden min-h-[20rem] sm:min-h-[25rem] md:min-h-[30rem]">
        <h5 className="text-white font-semibold uppercase text-sm tracking-wide">
          Best Panel for you in 2025
        </h5>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mt-2">
          Panel <br /> for you!
        </h2>
        <button className="bg-white px-6 py-2 w-full sm:w-auto my-4 text-black rounded-lg uppercase text-sm sm:text-base">
          Shop Now
        </button>
        {/* Images */}
        <img
          src={smartWatch}
          alt="Smartwatch"
          className="absolute top-3/4 right-4 sm:right-8 md:right-10 lg:right-12 
             transform -translate-y-1/2 w-full 
             max-w-[26vw] md:max-w-[20vw] lg:max-w-[18vw] 
             object-contain"
        />
      </div>
    </div>
  );
};

export default ProductShowcase;