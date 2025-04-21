import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import SmartMarketplace from "../contracts/SmartMarketplace.json";

const CONTRACT_ADDRESS = "0x476EAcb99E1fdba714F18B473A08FdBCCCedb4EF";

export default function Payment() {
  const [product, setProduct] = useState(null);
  const [productId, setProductId] = useState("product-001");
  const [orderId, setOrderId] = useState("order-001");
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState("0.03");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [txStatus, setTxStatus] = useState("");

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const res = {
        product: {
          name: "Wireless Bluetooth Headphones",
          description:
            "High-quality over-ear headphones with noise cancellation.",
          image: "https://images.unsplash.com/photo-1580894732444-3e9e60275c2f",
        },
        productId: "nani100",
        orderId: "order-002",
        amount: "1",
        quantity: 1,
      };
      setProduct(res.product);
      setProductId(res.productId);
      setOrderId(res.orderId);
      setAmount(res.amount);
      setQuantity(res.quantity);
    };

    fetchPaymentDetails();
  }, []);

  const handlePayment = async () => {
    if (!isConfirmed) {
      alert("Please accept the terms and conditions.");
      return;
    }

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

      const tx = await contract.purchaseProduct(productId, orderId, quantity, {
        // value: ethers.utils.parseEther(amount.toString()),
        value: amount.toString(),
      });

      setTxStatus("Transaction submitted. Waiting for confirmation...");
      await tx.wait();
      console.log("Transaction Hash:", tx.hash);
      setTxStatus("Payment successful!");
    } catch (error) {
      console.error("Transaction failed:", error);
      setTxStatus("Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-blue-50 p-6 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Confirm Your Payment
        </h2>

        {product ? (
          <div className="space-y-6">
            <div className="flex gap-6 items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 rounded-xl object-cover shadow-md"
              />
              <div>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p>
                <span className="font-medium">Product ID:</span> {productId}
              </p>
              <p>
                <span className="font-medium">Order ID:</span> {orderId}
              </p>
              <p>
                <span className="font-medium">Quantity:</span> {quantity}
              </p>
              <p>
                <span className="font-medium">Amount:</span> Ξ {amount}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={() => setIsConfirmed(!isConfirmed)}
              />
              <label>
                I agree to the{" "}
                <span className="text-blue-600">terms and conditions</span>.
              </label>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all"
            >
              Confirm Payment
            </button>

            {txStatus && (
              <p className="text-center text-sm text-gray-700 mt-2">
                {txStatus}
              </p>
            )}
          </div>
        ) : (
          <p className="text-center">Loading payment details...</p>
        )}
      </div>
    </div>
  );
}
