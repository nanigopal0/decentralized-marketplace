import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import OrderCard from "../layout/OrderCard";
import { handleUnauthorizedStatus } from "../../util/HandleUnauthorizedStatus";
import { pingServer } from "../../../store/slices/userSlice";
import { useDispatch } from "react-redux";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeStatus, setActiveStatus] = useState(""); // Track active status
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchOrders = async (status) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/order/get-by-sellerId?sellerId=${
          user.id
        }${status ? `&status=${status}` : ""}`,
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
        dispatch(pingServer());
      }
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
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100">
      <div className="p-4 sm:p-6 max-w-6xl mx-auto ">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Manage Orders</h2>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-6 overflow-x-auto scrollbar-hide max-w-xs sm:max-w-full mx-auto">
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

        {/* Orders Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-40 w-full rounded-lg" />
            ))}
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.orderId}
                order={order}
                onClick={() =>
                  navigate(`/order/details/${order.orderId}`, {
                    state: { order },
                  })
                }
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No orders found for the selected status.
          </p>
        )}
      </div>
    </div>
  );
}