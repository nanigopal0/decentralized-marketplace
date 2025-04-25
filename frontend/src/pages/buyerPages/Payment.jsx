import React, { useState } from "react";
import { ethers } from "ethers";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import SmartMarketplace from "../contracts/SmartMarketplace.json";
import { CONTRACT_ADDRESS } from "../../util/GetContractAddress";
import { useDispatch } from "react-redux";
import { handleUnauthorizedStatus } from "../../util/HandleUnauthorizedStatus";
import { pingServer } from "../../../store/slices/userSlice";
import { Loader2 } from "lucide-react"; // Spinner for loading indicator

export default function Payment() {
  const [loading, setLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [txStatus, setTxStatus] = useState("");
  const location = useLocation();
  const { product, order } = location.state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateOrderStatusToAccept = async (txHash) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/order/accept-order?orderId=${order.orderId}&txHash=${txHash}`,
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
        toast.success("Order accepted!");
        navigate("/myorders");
      } else {
        toast.error("Failed to update order status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const payWithCrypto = async () => {
    if (!isConfirmed) {
      toast.error("Please accept the terms and conditions.");
      return;
    }
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        SmartMarketplace,
        signer
      );

      const tx = await contract.purchaseProduct(
        order.productId,
        order.orderId,
        order.quantity,
        {
          value: ethers.utils.parseEther(order.totalPrice.toString()),
        }
      );

      setTxStatus("Transaction submitted. Waiting for confirmation...");
      await tx.wait();
      setTxStatus("Payment successful!");
      updateOrderStatusToAccept(tx.hash);
    } catch (error) {
      console.error("Error during payment:", error);
      setTxStatus("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-red-500">
          No product details available.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-xl rounded-lg">
        <CardContent className="p-6 sm:p-8 lg:p-10 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
            Confirm Your Payment
          </h2>

          {/* Product Details */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={product.mediaUrl || "/placeholder.jpg"}
              alt={product.title}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg object-cover shadow-md"
            />
            <div className="text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                {product.title}
              </h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Payment Details */}
          <div className="bg-gray-100 p-4 rounded-lg space-y-2">
            <p>
              <span className="font-bold text-gray-800">Amount:</span>{" "}
              <span className="text-green-600 font-bold">
                {product.price * order.quantity} {product.priceUnit || "ETH"}
              </span>
            </p>
            <p>
              <span className="font-medium">Product ID:</span> {product.productId}
            </p>
            <p>
              <span className="font-medium">Order ID:</span> {order.orderId}
            </p>
            <p>
              <span className="font-medium">Quantity:</span> {order.quantity}
            </p>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              checked={isConfirmed}
              onChange={() => setIsConfirmed(!isConfirmed)}
              className="w-4 h-4"
            />
            <label className="text-gray-700">
              I agree to the{" "}
              <span className="text-blue-600 cursor-pointer">
                terms and conditions
              </span>
              .
            </label>
          </div>

          {/* Confirm Payment Button */}
          <Button
            onClick={payWithCrypto}
            disabled={!isConfirmed || loading}
            className={`w-full py-2 rounded-lg font-semibold transition-all flex items-center justify-center ${
              isConfirmed
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Processing...
              </>
            ) : (
              "Confirm Payment"
            )}
          </Button>

          {/* Transaction Status */}
          {txStatus && (
            <p className="text-center text-sm text-gray-700 mt-2">{txStatus}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}