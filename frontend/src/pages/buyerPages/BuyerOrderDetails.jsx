import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function BuyerOrderDetails() {
  const location = useLocation();
  const { order } = location.state || {};
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-red-500">
          No order details found.
        </p>
      </div>
    );
  }

  const handleCancelOrder = async () => {
    setLoading(true);
    try {

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/order/cancel-otp?orderId=${order.orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.status === 204) {
        toast.success("Order cancelled successfully!");
        navigate("/myorders"); // Redirect to orders page
      }
      // setShowOtpInput(true);
      toast.info("OTP sent to your email for cancellation.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/order/verify-deliver-otp?orderId=${
          order.orderId
        }&&otp=${otp}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.status === 204) {
        toast.success("Order shipped successfully!");
        setShowOtpInput(false); // Hide OTP input after successful verification
        navigate("/orders"); // Redirect to orders page
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100 p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Order Details
      </h2>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        {/* Product Details */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Product Details
          </h3>
          <img
            src={order.productMediaUrl || "/placeholder.jpg"}
            alt={order.productTitle}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-lg font-semibold text-gray-800 mb-2">
            {order.productTitle}
          </p>
          <p className="text-md font-semibold text-gray-600">
            Product ID: {order.productId}
          </p>
          <p className="text-gray-800 text-md mb-2">
            <span className="font-medium">Price:</span> {order.totalPrice}{" "}
            {order.priceUnit ? order.priceUnit : "ETH"}
          </p>
        </div>

        {/* Seller Details */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Seller Details
          </h3>
          <div className="flex items-center gap-4">
            <img
              src={order.seller.avatar || "/placeholder-avatar.jpg"}
              alt={order.seller.fullName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="text-gray-600 text-sm mb-2">
                <span className="font-medium">Name:</span>{" "}
                {order.seller.fullName}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                <span className="font-medium">Email:</span> {order.seller.email}
              </p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Order Information
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            <span className="font-medium">Order ID:</span> {order.orderId}
          </p>
          <p className="text-gray-600 text-sm mb-2">
            <span className="font-medium">Status:</span> {order.orderStatus}
          </p>
          <p className="text-gray-600 text-sm mb-2">
            <span className="font-medium">Ordered At:</span>{" "}
            {new Date(order.orderedAt).toLocaleString()}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {(order.orderStatus === "Pending" ||
            order.orderStatus === "Accepted") && (
            <Button
              onClick={handleCancelOrder}
              disabled={loading}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              {loading ? "Processing..." : "Cancel Order"}
            </Button>
          )}
          {order.orderStatus === "Shipped" && (
            <Button asChild
              // onClick={()=>navigate("/confirm-delivery")}
              disabled={loading}
              className="bg-blue-500 text-white hover:bg-blue-600"
            ><Link to="/confirm-delivery" state={{order}}>
              {loading ? "Processing..." : "Deliver Order"}
              </Link>
            </Button>
          )}
        </div>

        {/* OTP Verification */}
        {showOtpInput && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Verify OTP</h3>
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mb-4"
            />
            <Button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
