import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState("India");
  const [shippingCost, setShippingCost] = useState(0);
  const [cart, setCart] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const navigate = useNavigate();

  // Check if the customer is logged in
  const isLoggedIn = () => {
    const token = localStorage.getItem("user");
    if (!token) return false;

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return !!decodedToken.id; // Return true if customerId exists
    } catch (err) {
      return false; // Invalid token
    }
  };

  // Fetch cart details from the backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("user");
        if (token) {
          // Decode the token to get the customer ID
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const customerId = decodedToken.id;

          // Fetch cart items from the backend
          const response = await axios.post(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/custumer/cart/all`,
            { customerId }, // Send customerId in the request body
            {
              headers: {
                "Content-Type": "application/json", // Ensure the content type is set
              },
            }
          );

          setCart(response.data.cart);
        } else {
          // Fetch cart items from localStorage for guest users
          let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
          // Fix nested product structure if necessary
          guestCart = guestCart.map((item) => ({
            product: item.product.product || item.product, // Fix nested structure
            quantity: item.quantity,
          }));

          setCart(guestCart);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // Calculate the total price of the cart
  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Calculate shipping cost based on the selected country
  useEffect(() => {
    switch (country) {
      case "India":
        setShippingCost(0);
        break;
      case "USA":
        setShippingCost(15);
        break;
      case "UK":
        setShippingCost(10);
        break;
      default:
        setShippingCost(0);
    }
  }, [country]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Razorpay payment
  const handlePayment = async () => {
    if (!isLoggedIn()) {
      toast.error("Please log in to proceed with the payment.");
      return;
    }

    try {
      const token = localStorage.getItem("user");
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const customerId = decodedToken.id;

      // Prepare order details
      const orderDetails = {
        amount: (totalPrice + shippingCost) * 100, // Amount in paise (e.g., 1000 = ₹10)
        currency: "INR",
        receipt: `order_${Date.now()}`, // Shortened receipt
        payment_capture: 1, // Auto-capture payment
      };

      // Create an order on your backend
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/custumer/create-order`,
        orderDetails
      );

      const { id: orderId } = response.data;

      // Prepare order summary for email and clearCart API
      const orderSummary = {
        items: cart.map((item) => ({
          productName: item.product.productName,
          quantity: item.quantity,
          price: item.product.price,
        })),
        totalPrice: totalPrice + shippingCost,
        shippingCost,
        country,
      };

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay Key ID
        amount: orderDetails.amount,
        currency: orderDetails.currency,
        name: "Radhe Laptops",
        description: "Payment for your order",
        order_id: orderId,
        handler: async (response) => {
          // Handle successful payment
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          // Verify payment on your backend
          const verificationResponse = await axios.post(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/custumer/verify-payment`,
            {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            }
          );

          if (verificationResponse.data.success) {
            setPaymentSuccess(true);
            toast.success(
              "Payment successful! Order summary sent to your email."
            );

            // Save customer information
            await axios.post(
              `${
                import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
              }/custumer/save-customer-info`,
              {
                customerId,
                ...formData,
                cart,
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                amount: totalPrice * 100,
                shippingCost,
                country,
              }
            );

            // Clear the cart and update order history
            // await axios.post(
            //   `${
            //     import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            //   }/custumer/clear-cart`,
            //   {
            //     customerId,
            //     orderSummary,
            //     razorpay_payment_id,
            //     razorpay_order_id,
            //     razorpay_signature,
            //     amount: totalPrice * 100, // in paise
            //   }
            // );

            // Send order summary email
            await axios.post(
              `${
                import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
              }/custumer/send-order-summary`,
              {
                customerId,
                orderSummary,
              }
            );

            // Clear the cart in the frontend
            setCart([]);
          } else {
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone || "9999999999", // Use customer's phone number if available
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Open Razorpay checkout modal
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment failed:", err);
      setError(
        err.response?.data?.message || "Payment failed. Please try again."
      );
      toast.error("Payment failed. Please try again.");
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle email input with validation
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData((prev) => ({ ...prev, email }));

    if (!email) {
      setEmailError("");
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }

    // Reset verification if email changes
    if (email !== formData.email) {
      setEmailVerified(false);
      setShowOtpField(false);
      setOtpSent(false);
    }
  };

  // Send OTP to email
  const sendOtp = async () => {
    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/otp/send`,
        { email: formData.email }
      );

      if (response.data.success) {
        toast.success("OTP sent to your email!");
        setShowOtpField(true);
        setOtpSent(true);
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/otp/verify`,
        {
          email: formData.email,
          otp,
        }
      );

      if (response.data.success) {
        toast.success("Email verified successfully!");
        setEmailVerified(true);
        setShowOtpField(false);
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error(error, "Invalid OTP Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section - Form */}
          <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Contact Information
              </h2>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email address
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        emailError ? "border-red-500" : ""
                      }`}
                      value={formData.email}
                      onChange={handleEmailChange}
                      onBlur={() => {
                        if (formData.email && !validateEmail(formData.email)) {
                          setEmailError("Please enter a valid email address");
                        }
                      }}
                      disabled={emailVerified}
                      required
                    />
                    {!emailVerified && validateEmail(formData.email) && (
                      <button
                        onClick={sendOtp}
                        disabled={otpSent}
                        className={`whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium ${
                          otpSent
                            ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                      >
                        {otpSent ? "OTP Sent" : "Verify Email"}
                      </button>
                    )}
                    {emailVerified && (
                      <span className="flex items-center px-4 py-2 text-green-600 font-medium">
                        Verified ✓
                      </span>
                    )}
                  </div>
                  {emailError && (
                    <p className="mt-1 text-sm text-red-600">{emailError}</p>
                  )}
                </div>
              </div>

              {showOtpField && (
                <div className="mt-4 bg-blue-50 p-4 rounded-md">
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Verification Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="otp"
                      placeholder="Enter 6-digit OTP"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                    />
                    <button
                      onClick={verifyOtp}
                      className="whitespace-nowrap bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Verify OTP
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    We've sent a 6-digit code to {formData.email}
                  </p>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Country/Region
                  </label>
                  <select
                    id="country"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  >
                    <option>India</option>
                    <option>USA</option>
                    <option>UK</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First name"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last name"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Street address"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="apartment"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    placeholder="Apartment, suite, etc."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="City"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      placeholder="State"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="pinCode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      PIN code
                    </label>
                    <input
                      type="text"
                      id="pinCode"
                      name="pinCode"
                      placeholder="PIN code"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              className={`w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 ${
                !isLoggedIn() ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePayment}
              disabled={!isLoggedIn()}
            >
              {isLoggedIn() ? "Pay Now" : "Please log in to proceed"}
            </button>

            <div className="flex justify-between mt-6 text-sm text-gray-500">
              <a
                href="/refund-policy"
                className="hover:text-gray-700 hover:underline"
              >
                Refund policy
              </a>
              <a
                href="/privacy-policy"
                className="hover:text-gray-700 hover:underline"
              >
                Privacy policy
              </a>
              <a
                href="/terms-of-use"
                className="hover:text-gray-700 hover:underline"
              >
                Terms of service
              </a>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex justify-between items-start"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={item.product.image}
                          alt={item.product.productName}
                          className="w-16 h-16 rounded-md object-cover border border-gray-200"
                        />
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.product.productName}
                        </h3>
                        <span className="text-sm font-semibold text-gray-900">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <p className="text-xs text-gray-500">
                          {item.product.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-medium text-gray-900">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Shipping</span>
                  <span className="text-sm font-medium text-gray-900">
                    {shippingCost === 0
                      ? "Free"
                      : `₹${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900 pt-2 border-t border-gray-200 mt-2">
                  <span>Total</span>
                  <span>₹{(totalPrice + shippingCost).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
