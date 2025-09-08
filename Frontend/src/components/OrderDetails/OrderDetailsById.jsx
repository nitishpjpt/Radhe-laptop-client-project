import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderDetailsById = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/custumer/orders/${orderId}`
        );
        setOrder(response.data.order);
      
      } catch (err) {
        setError("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading)
    return <p className="text-center text-lg animate-pulse">Loading...</p>;
  if (error)
    return <p className="text-red-500 text-center font-semibold">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        

        <h1 className="text-3xl font-bold text-center mb-8">
          Order Details
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Order #{order.orderNumber}</h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.paymentStatus === "Success"
                  ? "bg-green-100 text-green-700"
                  : order.paymentStatus === "Failed"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {order.paymentStatus}
            </span>
          </div>

          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                {item.product ? (
                  <>
                    <img
                      src={item.product?.image || "/placeholder.jpg"}
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-medium">
                        {item.product?.name}
                      </h3>
                      <p className="text-gray-600">
                        <strong>Category:</strong> {item.product?.category}
                      </p>
                      <p className="text-gray-600">
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p className="text-gray-600">
                        <strong>Price:</strong> ₹{item.priceAtPurchase}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-red-500">
                    Product details not available.
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
      
            <p className="text-gray-600">
              <strong>Order Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
           
            <p className="text-gray-600">
              <strong className="bg-blue-100 text-blue-800  py-1 rounded-md">
                Order Status: {order.status}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsById;
