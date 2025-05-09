import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react"; // Import spinner icon for loading
import { handleUnauthorizedStatus } from "../../util/HandleUnauthorizedStatus";
import { useDispatch } from "react-redux";
import { pingServer } from "../../../store/slices/userSlice";

const SellerDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [sellerDashboardData, setSellerDashboardData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const dispatch = useDispatch(); // Redux dispatch function
  const fetchSellerDashboardData = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/seller-info?userId=${user.id}`,
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
      if (response.ok) {
        const data = await response.json();
        setSellerDashboardData(data);
      }
    } catch (error) {
      console.error("Error fetching seller dashboard data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchSellerDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gradient-to-r from-yellow-100 to-pink-100">
      <main className="flex-1 p-4 sm:p-6 max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome, {user.fullName}!
          </h2>
        </header>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to={"/products"}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold text-gray-800">Total Products</h3>
            <p className="text-2xl font-bold text-blue-600">
              {sellerDashboardData.totalProducts}
            </p>
          </Link>
          <Link
            to={"/orders"}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold text-gray-800">Total Orders</h3>
            <p className="text-2xl font-bold text-green-600">
              {sellerDashboardData.totalOrders}
            </p>
          </Link>
          <Link
            to={"/orders?status=Pending"}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold text-gray-800">Pending Orders</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {sellerDashboardData.totalPendingOrders}
            </p>
          </Link>
          <Link
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold text-gray-800">Revenue</h3>
            <p className="text-2xl font-bold text-purple-600">
              {sellerDashboardData.totalEarnings} ETH
            </p>
          </Link>
          <Link
            to={"/orders?status=Cancelled"}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold text-gray-800">
              Cancelled Orders
            </h3>
            <p className="text-2xl font-bold text-red-600">
              {sellerDashboardData.totalCancelledOrders}
            </p>
          </Link>
          <Link
            to={"/orders?status=Delivered"}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold text-gray-800">
              Delivered Orders
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {sellerDashboardData.totalDeliveredOrders}
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;