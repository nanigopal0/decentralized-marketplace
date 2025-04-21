import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

export default function Payment() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  // const [txStatus, setTxStatus] = useState("");
  const location = useLocation();
  const { product, quantity } = location.state || {}; 
 

  const payAndPlaceOrder = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/order/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            productId: product.productId,
            quantity,
          }),
        }
      );
      if (response.status == 202) {
        const data = await response.json();
        console.log(data);
        toast.success("Order placed successfully!");
        setMessage("Order placed successfully!");
        // Redirect to myorder page or show success message
      }
    } catch (error) {
      toast.error("Failed to place order. Try again.");
      setMessage("Failed to place order. Try again.");
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
                  {product.price * quantity} {product.priceUnit || "ETH"}
                </span>
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
              onClick={payAndPlaceOrder}
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
