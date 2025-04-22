import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Sidebar from "../layout/Sidebar"; // Correctly importing your manually created Sidebar

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeStatus, setActiveStatus] = useState(""); // Track active status
  const navigate = useNavigate();
  const location = useLocation();

  const fetchOrders = async (status) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/order/get-by-sellerId?sellerId=${user.id}${
          status ? `&status=${status}` : ""
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders.");
      }
      const data = await response.json();
      setOrders(data);
      setFilteredOrders(data); // Initialize filtered orders
    } catch (err) {
      console.error("Failed to fetch seller orders", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (status) => {
    setActiveStatus(status); // Update active status
    if (status) {
      navigate(`?status=${status}`); // Update the URL with the selected status
    } else {
      setFilteredOrders(orders); // Reset to all orders
      navigate(""); // Clear the query parameter
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");
    setActiveStatus(status || ""); // Set the active status based on the URL
    fetchOrders(status);
  }, [location.search]);

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-yellow-100 to-pink-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
            Manage Orders
          </h2>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <Button
              variant={activeStatus === "" ? "solid" : "outline"}
              onClick={() => handleFilterChange("")}
              className={`${
                activeStatus === ""
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              All
            </Button>
            <Button
              variant={activeStatus === "Pending" ? "solid" : "outline"}
              onClick={() => handleFilterChange("Pending")}
              className={`${
                activeStatus === "Pending"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Pending
            </Button>
            <Button
              variant={activeStatus === "Accepted" ? "solid" : "outline"}
              onClick={() => handleFilterChange("Accepted")}
              className={`${
                activeStatus === "Accepted"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Accepted
            </Button>
            <Button
              variant={activeStatus === "Shipped" ? "solid" : "outline"}
              onClick={() => handleFilterChange("Shipped")}
              className={`${
                activeStatus === "Shipped"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Shipped
            </Button>
            <Button
              variant={activeStatus === "Delivered" ? "solid" : "outline"}
              onClick={() => handleFilterChange("Delivered")}
              className={`${
                activeStatus === "Delivered"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Delivered
            </Button>
            <Button
              variant={activeStatus === "Cancelled" ? "solid" : "outline"}
              onClick={() => handleFilterChange("Cancelled")}
              className={`${
                activeStatus === "Cancelled"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Cancelled
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-40 w-full rounded-lg" />
              ))}
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrders.map((order) => (
                <Card
                  key={order.orderId}
                  onClick={() =>
                    navigate(`/order/details/${order.orderId}`, {
                      state: { order },
                    })
                  }
                  className="cursor-pointer hover:shadow-lg transition border-gray-300 "
                >
                  <CardHeader>
                    <img
                      src={order.productMediaUrl || "/placeholder.jpg"}
                      alt={order.productTitle}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      {order.productTitle}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mb-2">
                      {order.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Order ID:</span>{" "}
                      {order.orderId}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Buyer mail:</span>{" "}
                      {order.buyer.email}
                    </p>
                    <Separator className="my-2" />
                    <p className="text-lg font-bold text-gray-800">
                      Price: {order.totalPrice} ETH
                    </p>
                    <Badge
                      variant={
                        order.orderStatus === "Shipped"
                          ? "success"
                          : order.orderStatus === "Pending"
                          ? "warning"
                          : order.orderStatus === "Delivered"
                          ? "success"
                          : "default"
                      }
                      className="mt-2"
                    >
                      {order.orderStatus}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No orders found for the selected status.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}