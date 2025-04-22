import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react"; // Import a spinner icon for loading
import Sidebar from "../layout/Sidebar";

export default function OrderDetails() {
  const location = useLocation();
  const { order } = location.state || {};
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [isGeneratingOtp, setIsGeneratingOtp] = useState(false); // Loading state for generating OTP
  const [isVerifying, setIsVerifying] = useState(false); // Loading state for verifying OTP
  const navigate = useNavigate();

  const generateShipmentOtp = async () => {
    setIsGeneratingOtp(true); // Start loading
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
      if (response.status === 204) {
        toast.success("OTP sent to your email!");
        setShowOtpInput(true); // Show OTP input after sending OTP
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error generating OTP:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsGeneratingOtp(false); // Stop loading
    }
  };

  const handleVerifyShipmentOtp = async () => {
    setIsVerifying(true); // Start loading
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
      setIsVerifying(false); // Stop loading
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
    <div className="min-h-screen flex bg-gradient-to-r from-yellow-100 to-pink-100 ">
      <Sidebar/>
      <div className="flex-1 ">
      <div className="max-w-5xl mx-auto">
        {/* <Card className="shadow-lg"> */}
          {/* <CardHeader> */}
            <CardTitle className="text-3xl font-bold text-gray-800">
              Order Details
            </CardTitle>
          {/* </CardHeader> */}
          <CardContent className="space-y-8 p-6">
            {/* Product and Buyer Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Details */}
              <div className="bg-white p-6 rounded-lg shadow-md">
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
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Buyer Details
                </h3>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={order.buyer.avatar || "/placeholder-avatar.jpg"}
                      alt={order.buyer.fullName}
                    />
                    <AvatarFallback>
                      {order.buyer.fullName
                        ? order.buyer.fullName.charAt(0).toUpperCase()
                        : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
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
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Order Details
              </h3>
              <p className="text-gray-600">
                <span className="font-medium">Order ID:</span> {order.orderId}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Price per product:</span>{" "}
                {order.pricePerItem} ETH
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Quantity:</span> {order.quantity}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Total Price:</span>{" "}
                {order.totalPrice} ETH
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <span className="font-medium">Status:</span>{" "}
                <Badge
                  variant={
                    order.orderStatus === "Shipped"
                      ? "success"
                      : order.orderStatus === "Pending"
                      ? "warning"
                      : "default"
                  }
                >
                  {order.orderStatus}
                </Badge>
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.orderedAt).toLocaleDateString()}
              </p>
            </div>

            {/* Confirm Shipment Button */}
                        {order.orderStatus === "Accepted" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Confirm Shipment
                </h3>
                {!showOtpInput ? (
                  <Button
                    onClick={generateShipmentOtp}
                    disabled={isGeneratingOtp}
                    className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                  >
                    {isGeneratingOtp && <Loader2 className="w-4 h-4 animate-spin" />}
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
                      {isVerifying && <Loader2 className="w-4 h-4 animate-spin" />}
                      {isVerifying ? "Verifying..." : "Verify OTP"}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        {/* </Card> */}
      </div>
      </div>
    </div>
  );
}