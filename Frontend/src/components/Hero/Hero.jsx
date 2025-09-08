import React from "react";
import Banner from "../../assets/banner-img.png";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
     <div className="m-10"> 
       <div className="relative w-full h-[560px] px-6 py-16 md:py-20 bg-[#FDEEF0] flex items-center justify-center w-20vw overflow-hidden rounded-3xl ">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between text-white gap-10">
        {/* Right - Text Content */}
        <div className="flex-1 text-center md:text-left space-y-4">
          {/* <p className="text-black uppercase tracking-widest text-2xl md:text-3xl">
            All New Trend Tablets
          </p> */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-black">
            Find the ideal <br />
            <span className="text-black">Laptop</span>
          </h1>
          <p className="text-black text-lg md:text-xl">
            with the power and creative tools <br></br>that match your bold
            style!
          </p>
          <button className="mt-5 px-6 flex items-center py-1 border text-black  text-lg font-semibold rounded-3xl  transition">
             <Link to="/products">Find Now</Link> <FiArrowUpRight />
          </button>
        </div>

        {/* Left - Image Section */}
        <div className="flex-1 flex justify-center">
          <img
            src={Banner}
            alt="Tablet"
            className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl h-auto"
          />
        </div>
      </div>
    </div>
     </div>
  );
};

export default HeroSection;
