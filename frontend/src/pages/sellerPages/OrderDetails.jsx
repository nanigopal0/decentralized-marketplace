import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { handleUnauthorizedStatus } from "../../util/HandleUnauthorizedStatus";
import { pingServer } from "../../../store/slices/userSlice";
import { useDispatch } from "react-redux";

export default function OrderDetails() {
  const location = useLocation();
  const { order } = location.state || {};
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [isGeneratingOtp, setIsGeneratingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const generateShipmentOtp = async () => {
    setIsGeneratingOtp(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/order/shipment-otp?orderId=${order.orderId}`,
        {
          method: "PUT",
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
      if (response.status === 204) {
        toast.success("OTP sent to your email!");
        setShowOtpInput(true);
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error generating OTP:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsGeneratingOtp(false);
    }
  };

  const handleVerifyShipmentOtp = async () => {
    setIsVerifying(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/order/verify-shipment-otp?orderId=${order.orderId}&&otp=${otp}`,
        {
          method: "PUT",
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
      if (response.status === 204) {
        toast.success("Order shipped successfully!");
        setShowOtpInput(false);
        navigate("/orders");
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-center text-gray-600">No order details found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100">
      <div className="flex-1">
        <div className="max-w-5xl mx-auto p-4 sm:p-6">
          <CardTitle className="text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
            Order Details
          </CardTitle>
          <CardContent className="space-y-8">
            {/* Product and Buyer Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Product Details */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Product Details
                </h3>
                <img
                  src={order.productMediaUrl || "/placeholder.jpg"}
                  alt={order.productTitle}
                  className="w-full h-64 rounded-lg object-cover mb-4"
                />
                <p className="text-lg font-bold text-gray-800">
                  {order.productTitle}
                </p>
                <Badge className="mt-2">{order.productType}</Badge>
                <p className="text-gray-800 font-bold mt-4">
                  Price: {order.totalPrice} ETH
                </p>
              </div>

              {/* Buyer Details */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Buyer Details
                </h3>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage
                      className=" object-cover"
                      src={order.buyer.avatar || "/placeholder-avatar.jpg"}
                      alt={order.buyer.fullName}
                    />
                    <AvatarFallback>
                      {order.buyer.fullName
                        ? order.buyer.fullName.charAt(0).toUpperCase()
                        : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <p className="text-gray-600">
                      <span className="font-medium">Name:</span>{" "}
                      {order.buyer.fullName}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span>{" "}
                      {order.buyer.email}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Role:</span>{" "}
                      {order.buyer.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Order Details */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                Order Details
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 font-medium">Order ID:</p>
                  <p className="text-gray-800 font-semibold truncate">
                    {order.orderId}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 font-medium">Price per Product:</p>
                  <p className="text-gray-800 font-semibold">
                    {order.pricePerItem} ETH
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 font-medium">Quantity:</p>
                  <p className="text-gray-800 font-semibold">
                    {order.quantity}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 font-medium">Total Price:</p>
                  <p className="text-gray-800 font-bold text-lg">
                    {order.totalPrice} ETH
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 font-medium">Status:</p>
                  <Badge
                    variant={
                      order.orderStatus === "Shipped"
                        ? "success"
                        : order.orderStatus === "Pending"
                        ? "warning"
                        : "default"
                    }
                    className="px-3 py-1 rounded-full text-sm"
                  >
                    {order.orderStatus}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 font-medium">Date:</p>
                  <p className="text-gray-800 font-semibold">
                    {new Date(order.orderedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Confirm Shipment Button */}
            {order.orderStatus === "Accepted" && (
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Confirm Shipment
                </h3>
                {!showOtpInput ? (
                  <Button
                    onClick={generateShipmentOtp}
                    disabled={isGeneratingOtp}
                    className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                  >
                    {isGeneratingOtp && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    {isGeneratingOtp ? "Generating OTP..." : "Confirm Shipment"}
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full"
                    />
                    <Button
                      onClick={handleVerifyShipmentOtp}
                      disabled={isVerifying}
                      className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                    >
                      {isVerifying && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                      {isVerifying ? "Verifying..." : "Verify OTP"}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </div>
  );
}