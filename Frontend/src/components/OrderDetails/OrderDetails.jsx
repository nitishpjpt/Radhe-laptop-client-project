import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderDetails = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [customerId, setCustomerId] = useState(null);

  // Retrieve customerId from localStorage
  useEffect(() => {
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

    try {
      const token = localStorage.getItem("user");
      if (token) {
        const decodedToken = decodeToken(token);
        const id = decodedToken?.id;
        setCustomerId(id);
      } else {
        throw new Error("No token found in localStorage.");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setError("Failed to retrieve customer information.");
      setLoading(false);
    }
  }, []);

  // Fetch order history from the backend
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        if (!customerId) {
          throw new Error("Customer ID is undefined.");
        }

        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/custumer/${customerId}/order-history`
        );
        setOrderHistory(response.data.orderHistory || []);
      } catch (err) {
        setError("Failed to fetch order history. Please try again later.");
        console.error("Error fetching order history:", err);
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      fetchOrderHistory();
    }
  }, [customerId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md w-full">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Order History
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            View all your past purchases and order details
          </p>
        </div>

        {!orderHistory || orderHistory.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No orders found
            </h3>
            <p className="mt-1 text-gray-500">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {orderHistory.map((order, index) => (
              <div
                key={order._id || index}
                className="bg-white shadow overflow-hidden sm:rounded-lg"
              >
                <div className="px-6 py-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Order #{order.paymentDetails?.orderId || index + 1}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Placed on {new Date(order.orderDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Last updated: {new Date(order.changedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.paymentDetails?.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.paymentDetails?.status || "Payment status unknown"}
                    </span>
                  </div>
                </div>

                <div className="px-6 py-4">
                  <div className="space-y-6">
                    {order.items.map((item, itemIndex) => (
                      <div
                        key={item._id || itemIndex}
                        className="flex items-start space-x-4 py-4 border-b border-gray-100 last:border-0"
                      >
                        {item.product ? (
                          <>
                            <div className="flex-shrink-0">
                              <img
                                src={item.product.image}
                                alt={item.product.productName}
                                className="w-20 h-20 rounded-md object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://via.placeholder.com/80";
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-md font-medium text-gray-900 truncate">
                                {item.product.productName}
                              </h4>
                              <p className="text-sm text-gray-500">
                                Brand: {item.product.brandName}
                              </p>
                              <p className="text-sm text-gray-500">
                                Quantity: {item.quantity}
                              </p>
                              <p className="text-sm text-gray-500">
                                Item Price: Rs. {item.price}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <p className="text-md font-medium text-gray-900">
                                Rs. {item.price * item.quantity}
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="text-red-500 text-sm">
                            Product details not available
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        Shipping Information
                      </h4>
                      <p className="text-sm text-gray-900">
                        Country: {order.country || "Not specified"}
                      </p>
                      <p className="text-sm text-gray-900 mt-1">
                        Shipping Cost: Rs. {order.shippingCost || "0"}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        Payment Details
                      </h4>
                      <div className="flex justify-between text-sm text-gray-900 mb-1">
                        <span>Amount</span>
                        <span>Rs. {order.paymentDetails?.amount}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-900 mb-1">
                        <span>Currency</span>
                        <span>{order.paymentDetails?.currency}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-900 mb-1">
                        <span>Payment ID</span>
                        <span className="truncate max-w-xs">{order.paymentDetails?.paymentId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        Order Summary
                      </h4>
                      <div className="flex justify-between text-sm text-gray-900 mb-1">
                        <span>Subtotal</span>
                        <span>Rs. {order.totalPrice}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-900 mb-1">
                        <span>Shipping</span>
                        <span>Rs. {order.shippingCost || "0.00"}</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium text-gray-900 mt-2 pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span>Rs. {order.totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <span className="text-sm font-medium text-gray-500 mr-2">
                        Order Status:
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>Order ID: {order._id}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;