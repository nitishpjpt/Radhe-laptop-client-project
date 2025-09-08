import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderStatusUpdate = ({ order, onStatusUpdate }) => {
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      setLoading(true);
      setError(null);

      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/${
          order._id
        }/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );

      if (onStatusUpdate) {
        onStatusUpdate(response.data.order);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      setError(err.response?.data?.message || "Failed to update status");
      // Revert to previous status on error
      setStatus(order.status);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
        ) : (
          <select
            value={status}
            onChange={handleStatusChange}
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]} cursor-pointer`}
          >
            <option value="pending" className="bg-yellow-100">
              Pending
            </option>
            <option value="processing" className="bg-blue-100">
              Processing
            </option>
            <option value="shipped" className="bg-purple-100">
              Shipped
            </option>
            <option value="delivered" className="bg-green-100">
              Delivered
            </option>
            <option value="cancelled" className="bg-red-100">
              Cancelled
            </option>
          </select>
        )}
      </div>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

const AdminOrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/custumer/all/details`
      );
      setOrders(response.data.orders);
      console.log("Fetched Orders:", response.data.orders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = (updatedOrder) => {
    setOrders(
      orders.map((o) =>
        o._id === updatedOrder._id ? { ...o, status: updatedOrder.status } : o
      )
    );
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md max-w-md mx-auto mt-8">
        <h3 className="font-bold">Error</h3>
        <p>{error}</p>
        <button
          onClick={fetchOrders}
          className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>

      {orders.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-4 bg-gray-50 border-b">
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Order #
                      {order.orderNumber || order._id.slice(-6).toUpperCase()}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <OrderStatusUpdate
                      order={order}
                      onStatusUpdate={handleStatusUpdate}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium mb-3">Items</h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.product?._id || item._id}
                      className="flex items-start gap-4 pb-4 border-b border-gray-100"
                    >
                      <img
                        src={item.product?.image || "/default-product.png"}
                        alt={item.product?.name || "Product image"}
                        className="w-16 h-16 object-contain "
                        onError={(e) => {
                          e.target.src = "/default-product.png";
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">
                          {item.product?.name || "Deleted Product"}
                        </h4>
                        {item.product?.sku && (
                          <p className="text-sm text-gray-500">
                            SKU: {item.product.sku}
                          </p>
                        )}
                        <div className="flex justify-between mt-1">
                          <span className="text-sm">Qty: {item.quantity}</span>
                          <span className="font-medium">
                            Rs.{" "}
                            {(item.priceAtPurchase * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between py-1">
                    <span>Subtotal</span>
                    <span>
                      Rs.{" "}
                      {order.items
                        .reduce(
                          (sum, item) =>
                            sum + item.priceAtPurchase * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrderDetails;
