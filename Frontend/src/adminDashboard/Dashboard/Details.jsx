import { useState, useEffect } from "react";
import axios from "axios";

const OrderDetailsPage = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/custumer`
        );
        const customersWithOrders =
          response.data?.custumers?.filter(
            (customer) => customer.orderHistory?.length > 0
          ) || [];
        setCustomers(customersWithOrders);
        setFilteredCustomers(customersWithOrders);
      } catch (err) {
        setError("Failed to fetch customers.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">
            Loading customer orders...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Error: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );

  if (filteredCustomers.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No orders found
          </h3>
          <p className="mt-1 text-gray-500">
            There are currently no customers with orders in the system.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Customer Orders
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all customers with their order history.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                placeholder="Search orders..."
                className="block w-full pr-10 sm:text-sm border-gray-300 rounded-md p-2 border focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {filteredCustomers.map((customer) => (
            <div
              key={customer._id}
              className="bg-white shadow overflow-hidden sm:rounded-lg"
            >
              <div className="px-6 py-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {customer.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">{customer.email}</p>
                </div>
                <div className="mt-3 sm:mt-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {customer.orderHistory?.length || 0} orders
                  </span>
                </div>
              </div>

              <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Contact Information
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {customer.email}
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {customer.phone || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Shipping Address
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {customer.address}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {customer.orderHistory.map((order) => (
                    <div
                      key={order._id}
                      className="border border-gray-200 rounded-lg divide-y divide-gray-200"
                    >
                      <div className="px-4 py-3 bg-gray-50 sm:px-6 flex justify-between items-center">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            Order #{order._id.slice(-6).toUpperCase()}
                          </h3>
                          <p className="mt-1 text-xs text-gray-500">
                            Placed on{" "}
                            {new Date(order.orderDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              order.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                          <button
                            onClick={() => openOrderModal(order)}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            View Details
                          </button>
                        </div>
                      </div>

                      <div className="px-4 py-3 sm:px-6">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              Items Summary
                            </h4>
                            <p className="text-sm text-gray-500">
                              {order.items.length} items
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              Total: ₹{order.totalPrice.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 bg-gray-500 opacity-75"
                onClick={closeModal}
              ></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Order #{selectedOrder._id.slice(-6).toUpperCase()}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Placed on{" "}
                          {new Date(selectedOrder.orderDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          selectedOrder.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : selectedOrder.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedOrder.status.charAt(0).toUpperCase() +
                          selectedOrder.status.slice(1)}
                      </span>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Items
                      </h4>
                      <ul className="divide-y divide-gray-200">
                        {selectedOrder.items.map((item) => (
                          <li key={item._id} className="py-4 flex">
                            <div className="flex-shrink-0">
                              <img
                                src={item.product.image}
                                alt={item.product.productName}
                                className="w-20 h-20 rounded-md object-cover"
                              />
                            </div>
                            <div className="ml-4 flex-1 flex flex-col sm:flex-row justify-between">
                              <div>
                                <h5 className="text-sm font-medium text-gray-900">
                                  {item.product.productName}
                                </h5>
                                <p className="text-sm text-gray-500">
                                  {item.product.category}
                                </p>
                              </div>
                              <div className="mt-2 sm:mt-0 text-right">
                                <p className="text-sm text-gray-900">
                                  ₹{item.price} × {item.quantity}
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-500">Subtotal</p>
                        <p className="text-sm text-gray-900">
                          ₹
                          {(
                            selectedOrder.totalPrice -
                            selectedOrder.shippingCost
                          ).toFixed(2)}
                        </p>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <p className="text-sm text-gray-500">Shipping</p>
                        <p className="text-sm text-gray-900">
                          ₹{selectedOrder.shippingCost.toFixed(2)}
                        </p>
                      </div>
                      <div className="mt-2 flex justify-between border-t border-gray-200 pt-2">
                        <p className="text-sm font-medium text-gray-900">
                          Total
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          ₹{selectedOrder.totalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Payment Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Payment ID</p>
                          <p className="text-sm text-gray-900">
                            {selectedOrder.paymentDetails?.paymentId || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Status</p>
                          <p className="text-sm text-gray-900">
                            {selectedOrder.paymentDetails?.status || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Payment Date</p>
                          <p className="text-sm text-gray-900">
                            {selectedOrder.paymentDetails?.paymentDate
                              ? new Date(
                                  selectedOrder.paymentDetails.paymentDate
                                ).toLocaleString()
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
