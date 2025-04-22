import React, { useEffect, useState } from "react";

const statusMap = {
  0: "Pending",
  1: "Accepted",
  2: "Shipped",
  3: "Delivered",
  4: "Refunded",
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/order/get-by-buyerId?buyerId=${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Failed to fetch orders.");

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100 p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        My Orders
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200"
          >
            {/* Order Image */}
            <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
              <img
                src={order.imageUrl || "/placeholder.jpg"}
                alt={order.image}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Order Details */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Order ID: {order.orderId}
            </h3>
            <p className="text-gray-600 text-sm mb-1">
              <span className="font-medium">Product ID:</span> {order.productId}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              <span className="font-medium">Price:</span> {order.totalPrice}{" "}
              {order.priceUnit}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              <span className="font-medium">Status:</span>{" "}
              {statusMap[order.status] || "Unknown"}
            </p>
            <p className="text-gray-500 text-sm mb-1">
              <span className="font-medium">Ordered At:</span>{" "}
              {new Date(order.orderedAt).toLocaleString()}
            </p>
            {order.shippedAt && (
              <p className="text-gray-500 text-sm">
                <span className="font-medium">Shipped At:</span>{" "}
                {new Date(order.shippedAt * 1000).toLocaleString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}