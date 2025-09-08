import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ContactUs = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State to manage form submission status
  const [submissionStatus, setSubmissionStatus] = useState({
    success: false,
    message: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend using Axios
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/contact`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle success
      if (response.status === 201) {
        toast.success("Message sent successfully!");
        setSubmissionStatus({
          success: true,
          message: "Message sent successfully!",
        });
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      // Handle error
      console.error("Error submitting form:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
      setSubmissionStatus({
        success: false,
        message:
          error.response?.data?.message ||
          "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <>
      <section className="bg-white dark:bg-slate-800" id="contact">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-4">
            <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
              <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                Contact
              </p>
              <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-3xl">
                Get in Touch
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">
                Quality Laptops. Affordable Prices. Exceptional Support{" "}
              </p>
            </div>
          </div>
          <div className="flex items-stretch justify-center">
            <div className="grid md:grid-cols-2">
              <div className="h-full pr-6">
                <p className="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400">
                  Have questions, feedback, or need assistance? We’re here to
                  help you find the best refurbished laptops at the best prices.
                  Reach out to us anytime, and our support team will get back to
                  you as soon as possible.
                </p>
                <ul className="mb-6 md:mb-0">
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                      </svg>
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Our Address
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        H.no-81, gali.no-56, 1st 60ft road,
                      </p>
                      <p className="text-gray-600 dark:text-slate-400">
                        Badarpur, Delhi - 110044
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-6 w-6"
                      >
                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                        <path d="M15 7a2 2 0 0 1 2 2"></path>
                        <path d="M15 3a6 6 0 0 1 6 6"></path>
                      </svg>
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Contact
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        Mobile:{" "}
                        <a
                          href="tel:+917461082945"
                          className="hover:underline text-blue-600 dark:text-blue-400"
                        >
                          +91-7461-082-945
                        </a>
                      </p>
                      <p className="text-gray-600 dark:text-slate-400">
                        Mobile:{" "}
                        <a
                          href="tel: +91-9205-627-825"
                          className="hover:underline text-blue-600 dark:text-blue-400"
                        >
                          +91-7461-082-945
                        </a>
                      </p>

                      <p className="text-gray-600 dark:text-slate-400">
                        Mail:&nbsp;&nbsp;&nbsp;&nbsp;
                        <a
                          href="mailto:Sales@radhelaptops.com"
                          className="hover:underline text-blue-600 dark:text-blue-400"
                        >
                          Sales@radhelaptops.com
                        </a>
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-6 w-6"
                      >
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                        <path d="M12 7v5l3 3"></path>
                      </svg>
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Working hours
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        Monday - Sunday: Open 24 Hours
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
                <h2 className="mb-4 text-2xl font-bold dark:text-white">
                  Ready to Get Started?
                </h2>
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <div className="mx-0 mb-1 sm:mb-4">
                        <input
                          type="text"
                          id="name"
                          autoComplete="given-name"
                          placeholder="Enter your full name"
                          className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mx-0 mb-1 sm:mb-4">
                        <input
                          type="email"
                          id="email"
                          autoComplete="email"
                          placeholder="Enter your email address"
                          className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <textarea
                        id="message"
                        name="message"
                        cols="30"
                        rows="5"
                        placeholder="Write your message..."
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="w-full bg-blue-800 text-white px-6 py-3 font-xl rounded-md sm:mb-0"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
                {submissionStatus.message && (
                  <div
                    className={`mt-4 text-center ${
                      submissionStatus.success
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {submissionStatus.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
