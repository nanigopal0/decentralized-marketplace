import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";
import { handleUnauthorizedStatus } from "@/util/HandleUnauthorizedStatus";
import { useDispatch } from "react-redux";
import { pingServer } from "../../../store/slices/userSlice";

export default function BuyerOrderDetails() {
  const location = useLocation();
  const { order } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [showMetaMaskAlert, setShowMetaMaskAlert] = useState(false); // State for MetaMask alert
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);

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
    if (!window.ethereum) {
      setShowMetaMaskAlert(true); // Show MetaMask alert
      return;
    }

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
      handleUnauthorizedStatus(response);
      if (response.status === 401) {
        dispatch(pingServer());
      }
      if (response.status === 204) {
        toast.success("Order cancelled successfully!");
        navigate("/myorders");
      } else {
        toast.info("OTP sent to your email for cancellation.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = () => {
    if (!window.ethereum) {
      setShowMetaMaskAlert(true); // Show MetaMask alert
      return;
    }
    navigate("/payment", { state: { product, order } });
  };

  const handleConfirmDelivery = () => {
    if (!window.ethereum) {
      setShowMetaMaskAlert(true); // Show MetaMask alert
      return;
    }
    navigate("/confirm-delivery", { state: { order } });
  };

  const getProductForPendingOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/product/get?productId=${order.productId}`,
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
      if (response.status === 200) {
        const data = await response.json();
        setProduct(data);
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

  useEffect(() => {
    if (order.orderStatus === "Pending") getProductForPendingOrder();
  }, [order]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100 p-4 sm:p-6">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800">
        Order Details
      </h2>
      <Card className="max-w-xs sm:max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
        <CardContent>
          {/* Product Details */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Product Details
            </h3>
            <div className="w-full aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden mb-4">
              <img
                src={order.productMediaUrl || "/placeholder.jpg"}
                alt={order.productTitle}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              {order.productTitle}
            </p>
            <p className="text-md font-semibold text-gray-600">
              Product ID: {order.productId}
            </p>
            <p className="text-gray-800 text-md mb-2">
              <span className="font-medium">Price:</span> {order.totalPrice}{" "}
              {order.priceUnit || "ETH"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {order.orderStatus === "Pending" && (
              <Button
                onClick={handleConfirmPayment}
                disabled={loading}
                className="bg-green-500 text-white hover:bg-green-600 w-full sm:w-auto"
              >
                Confirm Payment
              </Button>
            )}
            {(order.orderStatus === "Pending" ||
              order.orderStatus === "Accepted") && (
              <Button
                onClick={handleCancelOrder}
                disabled={loading}
                className="bg-red-500 text-white hover:bg-red-600 w-full sm:w-auto"
              >
                {loading ? "Processing..." : "Cancel Order"}
              </Button>
            )}
            {order.orderStatus === "Shipped" && (
              <Button
                onClick={handleConfirmDelivery}
                disabled={loading}
                className="bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto"
              >
                {loading ? "Processing..." : "Deliver Order"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* MetaMask Alert Dialog */}
      <AlertDialog open={showMetaMaskAlert} onOpenChange={setShowMetaMaskAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>MetaMask Not Detected</AlertDialogTitle>
            <AlertDialogDescription>
              MetaMask is required to perform this action. Please install MetaMask and try again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setShowMetaMaskAlert(false)}>Close</Button>
            <Button
              asChild
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Install MetaMask
              </a>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}