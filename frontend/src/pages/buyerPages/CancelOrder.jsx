import React, { useState } from "react";

export default function CancelOrder() {
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleCancelOrder = (e) => {
    e.preventDefault();
    // Here, you would send the email and orderId to your backend for processing
    setResponseMessage(
      "Your request has been received. We will process your cancellation within 24 hours."
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 to-yellow-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
          Cancel Your Order
        </h2>

        <form onSubmit={handleCancelOrder} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-black">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 text-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-black">Order ID</label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 text-blue-400"
              placeholder="Enter your Order ID"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-all"
          >
            Submit Cancellation Request
          </button>

          {responseMessage && (
            <p className="text-center text-sm text-gray-700 mt-2">
              {responseMessage}
            </p>
          )}

          <p className="text-xs text-gray-600 text-center mt-4">
            By submitting this form, you agree to our cancellation policy. All
            requests are reviewed and responded to within 24 hours. Please
            ensure the information provided is correct to avoid delays.
          </p>
        </form>
      </div>
    </div>
  );
}
