import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import SmartMarketplace from "../contracts/SmartMarketplace.json";

const CONTRACT_ADDRESS = "0x6eB31fDAA29735037c03f9f2f9581e01d7a89133";

export default function Payment() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const { product, order } = location.state || {};
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [txStatus, setTxStatus] = useState("");


  const updateOrderStatusToAccept = async (txHash) => {
      try {
        setLoading(true);
        setMessage("order accepting...");
  
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/order/accept-order?orderId=${order.orderId}&txHash=${txHash}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include"
          }
        );
        if (response.status == 204) {
          const data = await response.text();
          console.log(data);
          toast.success(  "Order accepted!");
          navigate("/myorders");
        }
      } catch (error) {
        toast.error("Failed to place order. Try again.");
      } finally {
        setLoading(false);
        setMessage("");
      }
    };
  
  const payWithCrypto = async () => {
    if (!isConfirmed) {
      alert("Please accept the terms and conditions.");
      return;
    }
    console.log(order)
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
          // value: ethers.utils.parseEther(amount.toString()),
         value: (order.totalPrice * 1000000000000000000).toString(),
        }
      );

      setTxStatus("Transaction submitted. Waiting for confirmation...");
      await tx.wait();
      console.log("Transaction Hash:", tx.hash);
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
    return <p className="text-center mt-10">No product details available.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-blue-50 p-6 flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardContent className="p-6 md:p-10">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Confirm Your Payment
          </h2>

          <div className="space-y-6">
            {/* Product Details */}
            <div className="flex gap-6 items-center">
              <img
                src={product.mediaUrl || "/placeholder.jpg"}
                alt={product.title}
                className="w-32 h-32 rounded-xl object-cover shadow-md"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Payment Details */}
            <div className="bg-gray-100 p-4 rounded-lg space-y-2">
              {/* <p>
                <span className="font-medium text-gray-800">
                  Seller Address:
                </span>{" "}
                <span className="text-gray-600">{product.sellerId}</span>
              </p> */}
              <p>
                <span className="font-bold text-gray-800">Amount:</span>{" "}
                <span className="text-green-600 font-bold">
                  {product.price * order.quantity} {product.priceUnit || "ETH"}
                </span>
                <span className="font-medium">Product ID:</span>{" "}
                {product.productId}
              </p>
              <p>
                <span className="font-medium">Order ID:</span> {order.orderId}
              </p>
              <p>
                <span className="font-medium">Quantity:</span> {order.quantity}
              </p>
              <p>
                <span className="font-medium">Amount:</span> 
                {order.totalPrice} ETH
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
              disabled={!isConfirmed}
              className={`w-full py-2 rounded-lg font-semibold transition-all ${
                isConfirmed
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Confirm Payment
            </Button>

            {/* Transaction Status */}
            {/* {txStatus && (
              <p className="text-center text-sm text-gray-700 mt-2">
                {txStatus}
              </p>
            )} */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
