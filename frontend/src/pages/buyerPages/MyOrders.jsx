import React, { useEffect, useState } from "react";
import axios from "axios";

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
       
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/order/get-by-buyerId?buyerId=${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
        )
        if (!response.ok) 
          throw new Error("Failed to fetch orders.");
        
        const data = await response.json();
        console.log(data)
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition-all"
          >
            <img
              src={order.imageUrl || "/placeholder.jpg"}
              alt={order.image}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{order.orderId}</h3>
            <p className="text-gray-600">Product ID: {order.productId}</p>
            <p className="text-gray-600">Price: {order.totalPrice} {order.priceUnit}</p>
            <p className="text-gray-600">Status: {order.status}</p>
            <p className="text-gray-500 text-sm">
              Ordered At: {new Date(order.orderedAt).toLocaleString()}
            </p>
            {/* {order.shippedAt > 0 && (
              <p className="text-gray-500 text-sm">
                Shipped At: {new Date(order.shippedAt * 1000).toLocaleString()}
              </p>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
}
