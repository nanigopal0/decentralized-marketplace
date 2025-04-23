import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Sidebar from "../layout/Sidebar";


const statusMap = {
  Pending: { label: "Pending", color: "bg-yellow-500 text-white" },
  Accepted: { label: "Accepted", color: "bg-blue-500 text-white" },
  Shipped: { label: "Shipped", color: "bg-purple-500 text-white" },
  Delivered: { label: "Delivered", color: "bg-green-500 text-white" },
  Cancelled: { label: "Cancelled", color: "bg-red-500 text-white" },
  Refunded: { label: "Refunded", color: "bg-gray-500 text-white" },
};

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
      {/* Sidebar Toggle Button for Mobile */}
   
        <Sidebar />
     

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 text-center lg:text-left text-gray-800">
          My Orders
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
          {orders.map((order) => (
            <Card
              key={order.orderId}
              className="cursor-pointer hover:shadow-xl transition-all"
              onClick={() => handleCardClick(order)}
            >
              <CardHeader>
                <div className="w-full aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden mb-4">
                  <img
                    src={order.productMediaUrl || "/placeholder.jpg"}
                    alt={order.productTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-sm md:text-base lg:text-lg font-semibold text-gray-800">
                  {order.productTitle}
                </CardTitle>
                <CardDescription className="text-xs md:text-sm lg:text-base text-gray-600">
                  Order ID: {order.orderId}
                </CardDescription>
              </CardHeader>
              <CardContent>
                
                <div className="mt-4">
                  <Badge
                    className={`px-3 py-1 rounded-full text-xs md:text-sm ${
                      statusMap[order.orderStatus]?.color ||
                      "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {statusMap[order.orderStatus]?.label || "Unknown"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

     
    </div>
  );
}