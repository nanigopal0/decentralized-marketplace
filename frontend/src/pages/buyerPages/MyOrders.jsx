import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderCard from "../layout/OrderCard";
import { useDispatch } from "react-redux";
import { handleUnauthorizedStatus } from "@/util/HandleUnauthorizedStatus";
import { pingServer } from "../../../store/slices/userSlice";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
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

      handleUnauthorizedStatus(response);
      if (response.status === 401) {
        dispatch(pingServer())
      }
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
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100">
      <div className="flex-1 p-4 lg:p-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 text-center lg:text-left text-gray-800">
          My Orders
        </h2>

        {orders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
            {orders.map((order) => (
              <OrderCard
                key={order.orderId}
                order={order}
                onClick={() => handleCardClick(order)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg">No orders found!</p>
          </div>
        )}
      </div>
    </div>
  );
}