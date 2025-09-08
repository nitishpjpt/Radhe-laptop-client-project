import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerDetails = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/custumer`
        );
        setCustomers(response.data.custumers);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const toggleOrderExpand = (customerId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [customerId]: !prev[customerId],
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) => {
    if (!amount) return "₹0";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Customer Details
      </h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-800 text-white p-4 font-semibold">
          <div className="col-span-3">Customer</div>
          <div className="col-span-3">Contact</div>
          <div className="col-span-3">Address</div>
          <div className="col-span-2">Total Orders</div>
          {/* <div className="col-span-1">Actions</div> */}
        </div>

        {customers.map((customer) => (
          <div key={customer._id} className="border-b border-gray-200">
            <div className="grid grid-cols-12 p-4 items-center hover:bg-gray-50">
              <div className="col-span-3">
                <div className="font-medium text-gray-900">{customer.name}</div>
                <div className="text-xs text-gray-500">
                  Joined:{" "}
                  {formatDate(
                    customer.createdAt || customer.resetPasswordExpire
                  )}
                </div>
              </div>
              <div className="col-span-3">
                <div className="text-gray-900">{customer.email}</div>
              </div>
              <div className="col-span-3">
                {customer.address || "Not provided"}
              </div>
              <div className="col-span-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {customer.orderHistory?.length || 0} orders
                </span>
              </div>
              {/* <div className="col-span-1 text-right">
                <button
                  onClick={() => toggleOrderExpand(customer._id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {expandedOrders[customer._id] ? "Hide" : "View"}
                </button>
              </div> */}
            </div>

            {/* {expandedOrders[customer._id] &&
              customer.orderHistory?.length > 0 && (
                <div className="bg-gray-50 p-4">
                  <h3 className="font-semibold text-lg mb-3">Order History</h3>
                  <div className="space-y-4">
                    {customer.orderHistory.map((order) => (
                      <div
                        key={order._id}
                        className="border rounded-lg overflow-hidden bg-white"
                      >
                        <div className="px-4 py-3 bg-gray-100 border-b flex justify-between items-center">
                          <div>
                            <span className="font-medium">
                              Order #
                              {order._id.toString().slice(-6).toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-600 ml-3">
                              {formatDate(order.orderDate)}
                            </span>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="p-4">
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="text-sm text-gray-500">
                                Total Amount
                              </div>
                              <div className="font-medium">
                                {formatCurrency(order.totalPrice)}
                              </div>
                            </div>
                          </div>

                          <h4 className="font-medium mb-2">Ordered Items:</h4>
                          <ul className="space-y-3">
                            {order.items.map((item) => (
                              <li
                                key={item._id}
                                className="flex items-start border-b pb-3 last:border-0"
                              >
                                {item.product?.image ? (
                                  <img
                                    src={item.product.image}
                                    alt={item.product.productName}
                                    className="w-16 h-16 object-cover rounded mr-3"
                                  />
                                ) : (
                                  <div className="w-16 h-16 bg-gray-200 rounded mr-3 flex items-center justify-center">
                                    <span className="text-xs text-gray-500">
                                      No image
                                    </span>
                                  </div>
                                )}
                                <div className="flex-1">
                                  <div className="font-medium">
                                    {item.product?.productName ||
                                      "Unknown Product"}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    <span>
                                      Price:{" "}
                                      {formatCurrency(item.product?.price)}
                                    </span>
                                    <span className="mx-2">×</span>
                                    <span>Qty: {item.quantity}</span>
                                  </div>
                                  <div className="text-sm font-medium mt-1">
                                    Subtotal:{" "}
                                    {formatCurrency(
                                      (item.product?.price || 0) * item.quantity
                                    )}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDetails;
