import React from "react";
import { FaArrowRight } from "react-icons/fa";
import premiumImg from "../../assets/product3.png"; // replace with your actual image
import bestSellingImg from "../../assets/product2.png"; // replace with your actual image
import { Link } from "react-router-dom";

const LatestModels = () => {
  return (
    <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-16 my-10">
      <section className="px-4 sm:px-6 md:px-16 py-10 md:py-16 bg-white">
        {/* Header Text Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Take a closer look at <br className="hidden sm:block" />
              our latest models
            </h2>
          </div>
          <div>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Explore the next generation of laptops crafted for performance and
              style. From ultra-slim designs to powerful processors, our latest
              models deliver seamless multitasking, stunning visuals, and
              unmatched portability—perfect for work, creativity, and everyday
              use.
            </p>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              src={premiumImg}
              alt="Premium Laptop"
              className="w-full h-52 sm:h-60 md:h-72 object-contain"
            />
            <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end text-white">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                Premium laptops
              </h3>
              <p className="text-sm sm:text-base mb-4">
                Special offers you can’t miss: these deals won’t last forever!
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-medium underline"
              >
                <Link to="/products">Shop Now</Link> <FaArrowRight className="text-xs" />
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              src={bestSellingImg}
              alt="Best Selling"
              className="w-full h-52 sm:h-60 md:h-72 object-contain"
            />
            <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end text-white">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                Best Selling
              </h3>
              <p className="text-sm sm:text-base mb-4">
                Special offers you can’t miss: these deals won’t last forever!
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-medium underline"
              >
                <Link to="/products">Shop Now</Link> <FaArrowRight className="text-xs" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LatestModels;
