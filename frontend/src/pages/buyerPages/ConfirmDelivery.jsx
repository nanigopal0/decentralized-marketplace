import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import SmartMarketplace from "../contracts/SmartMarketplace.json";
import { CONTRACT_ADDRESS } from "../../util/GetContractAddress";
import { handleUnauthorizedStatus } from "../../util/HandleUnauthorizedStatus";
import { useDispatch } from "react-redux";
import { pingServer } from "../../../store/slices/userSlice";
import { Loader2 } from "lucide-react"; // Import a spinner icon

export default function ConfirmDelivery() {
  const location = useLocation();
  const { order } = location.state || {};
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const generateDeliverOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/order/deliver-otp?orderId=${order.orderId}`,
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
        toast.success("OTP sent to your email!");
        setShowOtpInput(true);
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error generating OTP:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/order/verify-deliver-otp?orderId=${order.orderId}&&otp=${otp}`,
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
        toast.success("Delivery confirmed successfully!");
        setShowOtpInput(false);
        setOtp("");
        setTxStatus("Delivery confirmed successfully!");
        handleConfirmDelivery();
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

  const handleConfirmDelivery = async () => {
    setLoading(true);
    try {
      if (!window.ethereum) throw new Error("MetaMask is not installed");
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        SmartMarketplace,
        signer
      );

      const tx = await contract.confirmDelivery(order.orderId);
      setTxStatus("Transaction submitted. Waiting for confirmation...");
      await tx.wait();
      setTxStatus("Delivery confirmed successfully!");
      navigate("/myorders");
    } catch (error) {
      console.error("Delivery confirmation failed:", error);
      setTxStatus("Delivery confirmation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-red-500">
          No order details found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100 p-4 sm:p-6 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 max-w-lg w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Confirm Product Delivery
        </h2>

        {/* Order Details */}
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Order ID:</h3>
            <p className="text-gray-600">{order.orderId}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Product:</h3>
            <p className="text-gray-600">{order.productTitle}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Price:</h3>
            <p className="text-gray-600">
              {order.totalPrice} {order.priceUnit || "ETH"}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Seller:</h3>
            <p className="text-gray-600">{order.seller.fullName}</p>
          </div>
        </div>

        {/* Confirm Delivery Button */}
        {!showOtpInput && (
          <Button
            onClick={generateDeliverOtp}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Sending OTP...
              </>
            ) : (
              "Confirm Delivery"
            )}
          </Button>
        )}

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
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-all flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>
          </div>
        )}

        {/* Transaction Status */}
        {txStatus && (
          <p className="text-center text-sm text-gray-700 mt-4">{txStatus}</p>
        )}
      </div>
    </div>
  );
}