import React, { useState } from "react";
import { ethers } from "ethers";
import SmartMarketplace from "../contracts/SmartMarketplace.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_SMART_CONTRACT_ADDRESS;

export default function ConfirmDelivery() {
  const [orderId, setOrderId] = useState("");
  const [txStatus, setTxStatus] = useState("");

  const handleConfirmDelivery = async () => {
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

      const tx = await contract.confirmDelivery(orderId);
      setTxStatus("Transaction submitted. Waiting for confirmation...");
      await tx.wait();
      console.log("Transaction Hash:", tx.hash);

      setTxStatus("Delivery confirmed successfully!");
    } catch (error) {
      console.error("Delivery confirmation failed:", error);
      setTxStatus("Delivery confirmation failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Confirm Product Delivery
        </h2>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Order ID</label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
              placeholder="Enter your Order ID"
            />
          </div>

          <button
            onClick={handleConfirmDelivery}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
          >
            Confirm Delivery
          </button>

          {txStatus && (
            <p className="text-center text-sm text-gray-700 mt-2">{txStatus}</p>
          )}
        </div>
      </div>
    </div>
  );
}
