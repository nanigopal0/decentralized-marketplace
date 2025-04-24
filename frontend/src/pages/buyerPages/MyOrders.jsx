import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import OrderCard from "../layout/OrderCard";


export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCardClick = (order) => {
    navigate(`/buyer/order-details/${order.orderId}`, { state: { order } });
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-yellow-100 to-pink-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 text-center lg:text-left text-gray-800">
          My Orders
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 max-w-7xl mx-auto">
          {orders.map((order) => (
            <OrderCard
              key={order.orderId}
              order={order}
              onClick={() => handleCardClick(order)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}