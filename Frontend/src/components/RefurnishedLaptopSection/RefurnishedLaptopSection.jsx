import React from "react";
import { FaArrowRight } from "react-icons/fa";
import laptopImg from "../../assets/We-always-keep-it-real-for-you.jpg"; // Replace with your actual image path

const RefurbishedLaptopsSection = () => {
  return (
    <div className="bg-white py-20 px-6 md:px-24 flex flex-col md:flex-row items-center gap-16">
      {/* Left Image */}
      <div className="flex-shrink-0 rounded-3xl overflow-hidden w-full md:w-[550px]">
        <img src={laptopImg} alt="Refurbished Laptop" className="w-full h-full object-cover" />
      </div>

      {/* Right Content */}
      <div className="max-w-xl">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-snug">
          We always keep <br /> it real for you
        </h2>
        <p className="text-gray-600 mb-8">
          Our refurbished laptops go through rigorous quality checks, ensuring top-notch performance at a fraction of the price. Perfect for professionals, students, and everyday users who want reliable computing without overspending.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {[
            "Fully tested for performance & battery health.",
            "Affordable pricing with warranty included.",
            "Eco-friendly choice for sustainable tech.",
            "Wide range of brands and specifications.",
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="bg-indigo-100 text-black font-bold text-xl rounded-xl px-4 py-2">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-gray-700 text-sm">{text}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition">
            Read More
          </button>
          <button className="border border-black px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-100 transition">
            Shop Now <FaArrowRight className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefurbishedLaptopsSection;
