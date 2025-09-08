import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiStar } from "react-icons/fi";

const TestimonialsSlider = () => {
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / cardsPerSlide);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/testimonials`
        );
        setTestimonials(res.data);
      } catch (err) {
        toast.error("Failed to load testimonials");
        // Don't set any fallback data - leave array empty
        setTestimonials([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, totalSlides]);

  // Scroll effect
  useEffect(() => {
    const container = containerRef.current;
    if (container && testimonials.length > 0) {
      const cardWidth = container.offsetWidth / Math.min(cardsPerSlide, testimonials.length);
      container.scrollTo({
        left: currentSlide * cardWidth * cardsPerSlide,
        behavior: "smooth",
      });
    }
  }, [currentSlide, testimonials.length]);

  const renderStars = (count) => {
    return Array(5).fill(0).map((_, i) => (
      <FiStar 
        key={i} 
        className={`${i < count ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="px-4 py-12 bg-white text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="px-4 py-12 bg-white text-center">
        <p className="text-gray-500">No testimonials available</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-[23rem] py-12 bg-white">
      <div className="text-center mb-10">
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
          What our clients say
        </p>
      </div>

      {/* Scrollable Testimonial Slider */}
      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="flex transition-transform duration-500 ease-in-out overflow-x-hidden scroll-smooth snap-x snap-mandatory"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="snap-start min-w-full sm:min-w-[100%] md:min-w-[50%] lg:min-w-[33.33%] px-4 py-4"
            >
              <div className="border border-gray-200 p-6 rounded-xl shadow hover:shadow-lg transition-all h-full bg-white">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center mb-3">
                  {renderStars(testimonial.stars)}
                </div>
                <p className="text-sm text-gray-700 text-center italic">
                  "{testimonial.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      {testimonials.length > cardsPerSlide && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsSlider;