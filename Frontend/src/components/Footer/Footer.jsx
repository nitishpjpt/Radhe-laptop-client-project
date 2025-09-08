import {
  FaTruck,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { FiHeadphones } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="w-full bg-white py-10 px-4 sm:px-8 md:px-16 lg:px-[12rem]">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Logo & Contact */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Logo */}
            <div className="bg-yellow-400 px-4 py-2 rounded-md">
              <Link to="/">
                <h1 className="text-black font-bold text-2xl font-mono">
                  Radhe Laptops
                </h1>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="flex items-center gap-2">
              <FiHeadphones size={24} className="text-black" />
              <div className="text-sm text-gray-800">
                <p>
                  <a
                    href="mailto:support@storemail.com"
                    className="hover:underline"
                  >
                    support@storemail.com
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:Sales@radhelaptops.com"
                    className="hover:underline"
                  >
                    Sales@radhelaptops.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-full md:w-auto">
            <h3 className="text-lg font-semibold mb-2 text-center md:text-left">
              Keep Up With The Latest
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="border border-gray-300 rounded-full px-4 py-2 w-full sm:w-auto outline-none focus:ring-2 focus:ring-black"
              />
              <button className="bg-black text-white px-6 py-2 rounded-full">
                Send
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Lower Footer */}
      <footer className="bg-black text-white px-4 sm:px-8 md:px-16 lg:px-[8rem] py-12">
        {/* Description */}
        <p className="text-gray-300 max-w-4xl mb-10 text-center lg:text-left mx-auto lg:mx-0">
          Discover top-quality refurbished laptops from trusted brands, offering
          exceptional performance at a fraction of the price. Each device is
          thoroughly tested, certified, and backed by warranty for your peace of
          mind. Perfect for students, professionals, and budget-conscious users
          alike.
        </p>

        {/* Features + Links */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12">
          {/* Features Cards */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex items-center gap-4 bg-white rounded-2xl p-4 w-72 text-black">
              <FaTruck className="text-green-400 text-3xl" />
              <div>
                <h4 className="font-semibold text-lg">Free delivery</h4>
                <p className="text-gray-400 text-sm">24/7 service</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white rounded-2xl p-4 w-72 text-black">
              <FaShoppingCart className="text-green-400 text-3xl" />
              <div>
                <h4 className="font-semibold text-lg">Easy returns</h4>
                <p className="text-gray-400 text-sm">Within 30 days</p>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
            {/* Support */}
            <div>
              <h5 className="font-semibold mb-3 border-b border-gray-600 pb-2">
                Support
              </h5>
              <ul className="space-y-2 text-gray-300">
                <Link to="/refund-policy">
                  <li>Refund Policy</li>
                </Link>
                <Link to="/terms-and-conditions">
                  <li>Terms & Conditions</li>
                </Link>
                <Link to="/privacy-policy">
                  <li>Privacy policy</li>
                </Link>
                <Link to="/terms-of-use">
                  <li>Terms of Use</li>
                </Link>
              </ul>
            </div>

            {/* Laptop Brands */}
            <div>
              <h5 className="font-semibold mb-3 border-b border-gray-600 pb-2">
                Laptop Brands
              </h5>

              <ul className="flex flex-wrap gap-4 text-gray-300">
                <li className="w-1/2 sm:w-1/4">
                  <Link
                    to="/brands/asus"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Asus
                  </Link>
                </li>
                <li className="w-1/2 sm:w-1/4">
                  <Link
                    to="/brands/lenovo"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Lenovo
                  </Link>
                </li>
                <li className="w-1/2 sm:w-1/4">
                  <Link
                    to="/brands/mi"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Mi
                  </Link>
                </li>
                <li className="w-1/2 sm:w-1/4">
                  <Link
                    to="/brands/apple"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Apple
                  </Link>
                </li>
                <li className="w-1/2 sm:w-1/4">
                  <Link
                    to="/brands/dell"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Dell
                  </Link>
                </li>
                <li className="w-1/2 sm:w-1/4">
                  <Link
                    to="/brands/hp"
                    className="hover:text-white transition-colors duration-200"
                  >
                    HP
                  </Link>
                </li>
                <li className="w-1/2 sm:w-1/4">
                  <Link
                    to="/brands/acer"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Acer
                  </Link>
                </li>
                <li className="w-1/2 sm:w-1/4">
                  <Link
                    to="/brands/toshiba"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Toshiba
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h5 className="font-semibold mb-3 border-b border-gray-600 pb-2">
                Contact
              </h5>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-lg mt-1" />
                  <a
                    href="https://www.google.com/maps/search/?q=H.no-81,+gali.no-56,+1st+60ft+road,+Badarpur,+Delhi+-+110044"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-gray-300"
                  >
                    H.no-81, gali.no-56, 1st 60ft road, Badarpur, Delhi - 110044
                  </a>
                </li>

                <a
                  href="mailto:Sales@radhelaptops.com"
                  className="hover:underline text-gray-300"
                >
                  Sales@radhelaptops.com
                </a>
                <li className="flex items-center gap-3">
                  <FaPhoneAlt />
                  <a
                    href="tel:+917461082945"
                    className="hover:underline text-gray-300"
                  >
                    +91-7461-082-945
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            Copyright © 2025 Radhe Laptops. All rights reserved.
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-sm">Payment Accepted</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
              alt="Visa"
              className="h-6"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
              alt="MasterCard"
              className="h-6"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1200px-Stripe_Logo%2C_revised_2016.svg.png"
              alt="Stripe"
              className="h-6"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTvAj08svJytVLx7V_6Zw1DjgkEHsI5j5ULg&s"
              alt="RazorPay"
              className="h-6"
            />
          </div>
        </div>
      </footer>
    </>
  );
}
