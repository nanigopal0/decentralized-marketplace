import React, { useState } from "react";
import { ethers } from "ethers";
import SmartMarketplace from "../contracts/SmartMarketplace.json";
import { CONTRACT_ADDRESS } from "@/util/GetContractAddress";

export default function BlockchainOrderDetails() {
  const [orderId, setOrderId] = useState("");
  const [orderInfo, setOrderInfo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOrderDetails = async () => {
    setLoading(true);
    setError("");
    try {
      if (!window.ethereum) throw new Error("MetaMask is not installed");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS ,
        SmartMarketplace,
        signer
      );

      const result = await contract.getOrder(orderId);
      const [
        buyer,
        seller,
        productId,
        price,
        productType,
        status,
        createdAt,
        shippedAt,
      ] = result;

      setOrderInfo({
        buyer,
        seller,
        productId,
        price: ethers.formatEther(price),
        productType,
        status,
        createdAt: new Date(Number(createdAt) * 1000).toLocaleString(),
        shippedAt:
          Number(shippedAt) > 0
            ? new Date(Number(shippedAt) * 1000).toLocaleString()
            : "Not shipped yet",
      });
    } catch (err) {
      console.error("Error fetching order:", err);
      setError("Failed to fetch order details. Please try again.");
      setOrderInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Order Details</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />

          <button
            onClick={fetchOrderDetails}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
          >
            {loading ? "Fetching..." : "Get Order Details"}
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {orderInfo && (
            <div className="mt-6 space-y-2">
              <p>
                <strong>Buyer:</strong> {orderInfo.buyer}
              </p>
              <p>
                <strong>Seller:</strong> {orderInfo.seller}
              </p>
              <p>
                <strong>Product ID:</strong> {orderInfo.productId}
              </p>
              <p>
                <strong>Price:</strong> {orderInfo.price} ETH
              </p>
              <p>
                <strong>Product Type:</strong>{" "}
                {Number(orderInfo.productType) === 0 ? "Physical" : "Digital"}
              </p>

              <p>
                <strong>Status:</strong> {orderInfo.status}
              </p>
              <p>
                <strong>Created At:</strong> {orderInfo.createdAt}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
