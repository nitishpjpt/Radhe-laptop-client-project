import { Link, useNavigate } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/logo.svg";
import { PiHeartStraightFill } from "react-icons/pi";
import { FaPercent, FaChevronDown, FaTwitter } from "react-icons/fa6";
import { TiSocialLinkedin } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa6";
import { CgFacebook } from "react-icons/cg";
import { SlEarphones } from "react-icons/sl";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useAppContext } from "../../Context/CartContext/cartContext";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const decodeToken = (token) => {
  if (!token) return null;

  try {
    const [header, payload, signature] = token.split(".");
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const navigation = [
  { name: "Home", href: "/" },
  { name: "Catalog", href: "/all-collections" },
  { name: "Collection", href: "/products" },
  { name: "Contact Us", href: "/contact-us" },
];

const Navbar = () => {
  const { cartCount, wishlistCount, updateCartCount } = useAppContext();
  const navigate = useNavigate();
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localCartCount, setLocalCartCount] = useState(0);
  const [loginDetails, setLoginDetails] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("user");
    const decoded = decodeToken(token);
    if (decoded) setUser(decoded);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("user");
    const decodedToken = decodeToken(token);
    if (decodedToken) setLoginDetails(decodedToken);
  }, []);

  // Sync local cart count with context
  useEffect(() => {
    setLocalCartCount(cartCount);
  }, [cartCount]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("logged out successfully", {
      onClose: () => {
        navigate("/login");
        window.location.reload();
      },
    });
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 300);
    navigate("/login");
  };

  return (
    <div className="mx-4 sm:mx-6 lg:mx-10">
      <Disclosure as="nav" className="bg-white">
        {/* Top header */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-2 text-xs sm:text-sm text-gray-700 border-b border-gray-200">
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
            {/* Logo */}
            <Link to="/">
              <img className="w-12 sm:w-14 md:w-16" src={Logo} alt="Logo" />
            </Link>

            {/* Mobile menu button */}
            <div className="sm:hidden">
              <DisclosureButton
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" />
                )}
              </DisclosureButton>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-3 mt-2 sm:mt-0">
            <span className="text-lg font-extrabold">
              <SlEarphones />
            </span>
            <span>24/7 Support Centre</span>
            <span>Follow Us:</span>
            <div className="flex gap-2">
              <span className="border p-1 rounded-full">
                <CgFacebook className="text-lg" />
              </span>
              <span className="border p-1 rounded-full">
                <TiSocialLinkedin className="text-lg" />
              </span>
              <span className="border p-1 rounded-full">
                <FaInstagram className="text-lg" />
              </span>
              <span className="border p-1 rounded-full">
                <FaTwitter className="text-lg" />
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-2 sm:px-4 pt-2">
          <div className="flex justify-between items-center py-3">
            {/* Desktop Nav */}
            <div className="hidden sm:flex items-center gap-3 md:gap-4 lg:gap-6">
              {/* Hot Deals Button */}
              <Link
                to="/hot-deals"
                className="flex items-center bg-lime-200 text-black px-3 py-1 md:px-4 md:py-2 rounded-full font-semibold text-xs md:text-sm hover:bg-lime-300"
              >
                <FaPercent className="mr-1 md:mr-2" /> Hot Deals
              </Link>

              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-800 text-xs md:text-sm font-semibold hover:text-blue-600 whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}

              {/* My Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsAccountDropdownOpen((prev) => !prev);
                    setIsPagesDropdownOpen(false);
                  }}
                  className="flex items-center gap-1 text-xs md:text-sm font-semibold text-gray-800 hover:text-blue-600 whitespace-nowrap"
                >
                  My Account <FaChevronDown className="text-xs" />
                </button>
                {isAccountDropdownOpen && (
                  <div className="absolute bg-white shadow-md rounded-md mt-2 py-2 w-40 md:w-44 z-50">
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-gray-100 text-xs md:text-sm"
                    >
                      {loginDetails?.email || "Login"}
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 hover:bg-gray-100 text-xs md:text-sm"
                    >
                      Register
                    </Link>
                    <Link
                      to="/order/details"
                      className="block px-4 py-2 hover:bg-gray-100 text-xs md:text-sm"
                    >
                      Order Details
                    </Link>
                  </div>
                )}
              </div>

              {/* Pages Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsPagesDropdownOpen((prev) => !prev);
                    setIsAccountDropdownOpen(false);
                  }}
                  className="flex items-center gap-1 text-xs md:text-sm font-semibold text-gray-800 hover:text-blue-600 whitespace-nowrap"
                >
                  Pages <FaChevronDown className="text-xs" />
                </button>
                {isPagesDropdownOpen && (
                  <div className="absolute bg-white shadow-md rounded-md mt-2 py-2 w-40 md:w-44 z-50">
                    <Link
                      to="/terms-of-use"
                      className="block px-4 py-2 hover:bg-gray-100 text-xs md:text-sm"
                    >
                      Terms of Use
                    </Link>
                    <Link
                      to="/terms-and-conditions"
                      className="block px-4 py-2 hover:bg-gray-100 text-xs md:text-sm"
                    >
                      Terms & Conditions
                    </Link>
                    <Link
                      to="/privacy-policy"
                      className="block px-4 py-2 hover:bg-gray-100 text-xs md:text-sm"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 relative">
              {/* 🔍 Search Bar */}
              <div className="relative hidden sm:block">
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-4 pr-8 py-1 md:py-2 border border-gray-300 rounded-full text-xs md:text-sm focus:outline-none focus:ring-1 md:focus:ring-2 focus:ring-blue-500 w-32 md:w-40 lg:w-48"
                />
              </div>

              {/* Mobile Search Icon */}
              <div className="sm:hidden">
                <FaSearch className="text-xl text-gray-700" />
              </div>

              {/* Wishlist */}
              <Link to="/whitelist" className="relative">
                <PiHeartStraightFill className="text-xl md:text-2xl text-gray-700 hover:text-red-500" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/add-to-cart" className="relative">
                <MdOutlineShoppingCart className="text-xl md:text-2xl text-gray-700 hover:text-blue-500" />
                {localCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {localCartCount}
                  </span>
                )}
              </Link>

              {/* User Profile Menu */}
              <Menu as="div" className="relative">
                <MenuButton className="rounded-full focus:outline-none">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYogPKR1mzQ6msptbTwja31pVhuddqGPHCvA&s"
                    alt="User"
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
                  />
                </MenuButton>
                <MenuItems className="absolute right-0 mt-2 w-48 md:w-58 bg-white border rounded-md shadow-lg z-50">
                  <MenuItem>
                    <h4 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Link to="/login">
                        {loginDetails?.email ? loginDetails.email : "Login"}
                      </Link>
                    </h4>
                  </MenuItem>
                  {/* Conditionally render the Order Details link */}
                  {loginDetails && loginDetails.role !== "admin" && (
                    <MenuItem>
                      <h4 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Link to="/order/details">Order Details</Link>
                      </h4>
                    </MenuItem>
                  )}
                  {user?.role === "admin" && (
                    <>
                      <MenuItem>
                        <Link
                          to="/admin-dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Admin Dashboard
                        </Link>
                      </MenuItem>
                    </>
                  )}
                  {loginDetails?.email && (
                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-xs md:text-sm hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </MenuItem>
                  )}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <DisclosurePanel className="sm:hidden px-4 pb-4">
          <div className="flex flex-col gap-2 border-t border-gray-200 pt-4">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block py-2 px-2 text-sm font-medium text-gray-800 hover:text-blue-500 hover:bg-gray-50 rounded"
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Dropdown Menus */}
            <div className="mt-2">
              <button
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                className="flex items-center justify-between w-full py-2 px-2 text-sm font-medium text-gray-800 hover:text-blue-500 hover:bg-gray-50 rounded"
              >
                My Account{" "}
                <FaChevronDown
                  className={`text-xs transition-transform ${
                    isAccountDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {isAccountDropdownOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  <Link
                    to="/login"
                    className="block py-2 px-2 text-sm text-gray-700 hover:text-blue-500 hover:bg-gray-50 rounded"
                  >
                    {loginDetails?.email || "Login"}
                  </Link>

                  <Link
                    to="/order/details"
                    className="block py-2 px-2 text-sm text-gray-700 hover:text-blue-500 hover:bg-gray-50 rounded"
                  >
                    Order Details
                  </Link>
                </div>
              )}

              <button
                onClick={() => setIsPagesDropdownOpen(!isPagesDropdownOpen)}
                className="flex items-center justify-between w-full py-2 px-2 text-sm font-medium text-gray-800 hover:text-blue-500 hover:bg-gray-50 rounded mt-2"
              >
                Pages{" "}
                <FaChevronDown
                  className={`text-xs transition-transform ${
                    isPagesDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {isPagesDropdownOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  <Link
                    to="/faq"
                    className="block py-2 px-2 text-sm text-gray-700 hover:text-blue-500 hover:bg-gray-50 rounded"
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/terms"
                    className="block py-2 px-2 text-sm text-gray-700 hover:text-blue-500 hover:bg-gray-50 rounded"
                  >
                    Terms
                  </Link>
                  <Link
                    to="/privacy"
                    className="block py-2 px-2 text-sm text-gray-700 hover:text-blue-500 hover:bg-gray-50 rounded"
                  >
                    Privacy Policy
                  </Link>
                </div>
              )}

              <Link
                to="/hot-deals"
                className="flex items-center justify-start w-full py-2 px-2 text-sm font-medium text-gray-800 hover:text-blue-500 hover:bg-gray-50 rounded mt-2"
              >
                <FaPercent className="mr-2" /> Hot Deals
              </Link>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
};

export default Navbar;
