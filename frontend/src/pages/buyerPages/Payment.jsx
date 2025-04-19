import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function Payment() {
  const [product, setProduct] = useState(null);
  const [sellerAddress, setSellerAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [txStatus, setTxStatus] = useState("");

  useEffect(() => {
    // Simulate backend response
    const fetchPaymentDetails = async () => {
      // const res = await axios.get("/api/payment-details");
      // const { product, sellerAddress, amount } = res.data;
      const res = {
        product: {
          name: "Wireless Bluetooth Headphones",
          description:
            "High-quality over-ear headphones with noise cancellation.",
          image: "https://images.unsplash.com/photo-1580894732444-3e9e60275c2f",
        },
        sellerAddress: "0xABCD1234abcd1234ABCD1234abcd1234ABCD1234",
        amount: "0.03",
      };
      setProduct(res.product);
      setSellerAddress(res.sellerAddress);
      setAmount(res.amount);
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

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const tx = await signer.sendTransaction({
        to: sellerAddress,
        value: ethers.utils.parseEther(amount),
      });

      setTxStatus("Transaction submitted. Waiting for confirmation...");
      await tx.wait();
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
                <span className="font-medium">Seller Address:</span>{" "}
                {sellerAddress}
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
