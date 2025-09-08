import { useEffect, useState } from "react";
import banner1 from "../../assets/banner-img.png";
import banner2 from "../../assets/banner-img2.png";
import banner3 from "../../assets/headphone1.png";

const slides = [banner1, banner2, banner3];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
      <div className="m-10">
         <div className="w-20vw overflow-hidden rounded-3xl bg-black">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
          width: `${slides.length * 100}%`,
        }}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="min-w-full flex flex-col md:flex-row items-center  text-white h-[500px] px-6 md:px-20"
          >
            {/* Left Side - Image */}
            <div className="flex items-center justify-center">
              <img
                src={slide}
                alt={`Slide ${idx + 1}`}
                className="max-h-[300px]  object-contain"
              />
            </div>

            {/* Right Side - Text */}
            <div className=" text-center md:text-left mt-6 md:mt-0 ">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-snug">
                You can dream <br /> it, We can do it.
              </h2>
              <button className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition">
                View Detail →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
      </div>
  );
};

export default HeroCarousel;
