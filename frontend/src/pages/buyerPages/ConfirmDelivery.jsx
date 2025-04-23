import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import SmartMarketplace from "../contracts/SmartMarketplace.json";
import { CONTRACT_ADDRESS } from "../../util/GetContractAddress";

// const CONTRACT_ADDRESS = "0xfd32099CfA3cd4037A9Ea4961057De1beD433e26";

export default function ConfirmDelivery() {
  const location = useLocation();
  const { order } = location.state || {};
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState("");
  const navigate = useNavigate();

  const generateDeliverOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/order/deliver-otp?orderId=${
          order.orderId
        }`,
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
        toast.success("Delivery confirmed successfully!");
        setShowOtpInput(false); // Hide OTP input after successful verification
        setOtp(""); // Clear OTP input
        setTxStatus("Delivery confirmed successfully!");
        handleConfirmDelivery(); // Call the function to confirm delivery on the blockchain
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
    console.log(order.orderId)
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
      console.log("Transaction Hash:", tx.hash);
      setTxStatus("Delivery confirmed successfully!");
      navigate("/myorders"); // Redirect to orders page
    } catch (error) {
      console.error("Delivery confirmation failed:", error);
      setTxStatus("Delivery confirmation failed. Please try again.");
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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
          >
            {loading ? "Sending OTP..." : "Confirm Delivery"}
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
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-all"
            >
              {loading ? "Verifying..." : "Verify OTP"}
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
