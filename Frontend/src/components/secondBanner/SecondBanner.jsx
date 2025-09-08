import React from "react";
import Banner from "../../assets/second-banner.png"; // laptop image
import BackgroundTexture from "../../assets/background-image-removebg-preview.png"; // add your orange wave texture
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const SecondBanner = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-12 py-12">
      <div className="relative w-full h-auto md:h-[600px] bg-[#EEEFF4] flex flex-col-reverse md:flex-row items-center justify-between overflow-hidden rounded-3xl">
        {/* Background Texture */}
        <img
          src={BackgroundTexture}
          alt="Background Texture"
          className="absolute bottom-0 right-0 w-[80vw] md:w-[60vw] h-auto object-contain opacity-80 z-0 pointer-events-none"
        />

        {/* Left - Image Section */}
        <div className="relative z-10 flex-1 w-full flex justify-center items-center p-4 md:p-0">
          <img
            src={Banner}
            alt="Tablet"
            className="w-[70%] sm:w-[80%] md:w-[90%] lg:w-full h-auto max-h-[400px] md:max-h-[500px] object-contain"
          />
        </div>
        {/* Right - Text Content */}
        <div className="relative z-10 flex-1 w-full text-center md:text-left px-4 sm:px-6 lg:px-12 py-10 space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Find your ideal <br />
            <span className="text-white">Laptop today</span>
          </h1>
          <p className="text-white text-base sm:text-lg md:text-xl">
            with the power and creative tools that match your{" "}
            <br className="hidden sm:block" />
            bold style!
          </p>
          <button className="mt-4 inline-flex items-center px-6 py-2 border border-white text-white text-base sm:text-lg font-semibold rounded-full transition duration-300 hover:bg-black hover:text-white">
             <Link to="/products">Find Now</Link> <FiArrowUpRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondBanner;
