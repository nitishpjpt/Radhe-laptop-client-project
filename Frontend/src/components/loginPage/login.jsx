import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/custumer/login`,
        { email, password }
      );

      // Display success message
      toast.success(response.data.message, {
        onClose: () => {
          navigate("/"); // Navigate to the home page

          window.location.reload(); // Reload the page after a short delay
        },
      });

      setTimeout(() => {
        navigate("/");
        window.location.reload(); // Ensure page state is fresh
      }, 300); // Slight delay beyond toast autoClose
      // Save the token in localStorage
      localStorage.setItem("user", response.data.token); // Store only the token

      // Decode the token to get customer details
      const decodedToken = JSON.parse(atob(response.data.token.split(".")[1]));
      console.log("Decoded Token:", decodedToken);

      // Merge guest cart with the customer's account cart (if guest cart exists)
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      console.log("Guest Cart:", guestCart);

      if (guestCart.length > 0) {
        console.log("Merging guest cart with customer cart...");
        await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/custumer/cart/merge`,
          {
            customerId: decodedToken.id, // Pass the customer ID from the token
            guestCart,
          }
        );

        console.log("Guest cart merged successfully.");
        // Clear the guest cart from localStorage after merging
        localStorage.removeItem("guestCart");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src={Logo} className="mx-auto h-20 w-auto" />
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Login into your account
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              <p className="mt-10 text-center text-sm/6 text-gray-500">
            If you don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
