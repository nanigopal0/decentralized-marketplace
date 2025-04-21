import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState({});
  const [otpInputs, setOtpInputs] = useState({});
  const [otpVisible, setOtpVisible] = useState({});

  const fetchOrders = async () => {
    setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      try {
       const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/order/get-by-sellerId?sellerId=${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }
        const data = await response.json();
        console.log(data);
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch seller orders", err);
      }
      finally{
        setLoading(false);
      }
    };
    
    useEffect(() => {
    fetchOrders();
  }, []);


  const handleGenerateOtp = async (orderId) => {
    try {
      setLoading(true);
      setMessages((prev) => ({ ...prev, [orderId]: "" }));

      // const res = await axios.post("/api/seller/generateOtp", { orderId });
      // if (res.status === 200) {
      setOtpVisible((prev) => ({ ...prev, [orderId]: true }));
      setMessages((prev) => ({ ...prev, [orderId]: "OTP sent successfully." }));
      // } else {
      //   setMessages((prev) => ({ ...prev, [orderId]: "Failed to generate OTP." }));
      // }
    } catch (err) {
      console.error("OTP generation error", err);
      setMessages((prev) => ({
        ...prev,
        [orderId]: "Failed to generate OTP. Try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmShipment = async (orderId) => {
    try {
      setLoading(true);
      setMessages((prev) => ({ ...prev, [orderId]: "" }));

      const otp = otpInputs[orderId];
      if (!otp) {
        setMessages((prev) => ({ ...prev, [orderId]: "Please enter OTP." }));
        return;
      }

      // await axios.post("/api/seller/verifyShipmentOtp", { orderId, otp });
      setMessages((prev) => ({
        ...prev,
        [orderId]: `Shipment confirmed with OTP ${otp}`,
      }));
    } catch (err) {
      console.error("Shipment confirmation error", err);
      setMessages((prev) => ({
        ...prev,
        [orderId]: "Failed to confirm shipment. Try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Manage Orders</h2>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-6"
              >
                <img
                  src={order.image}
                  alt={order.productName}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">
                    {order.productName}
                  </h3>
                  <p className="text-gray-600 mb-1">{order.description}</p>
                  <p className="text-sm text-gray-500 mb-1">
                    Order ID: {order.orderId}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Buyer Address: {order.buyer}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Delivery Date: {order.estimatedDelivery}
                  </p>
                  <p className="text-lg font-bold">Price: Ξ {order.price}</p>

                  <button
                    onClick={() => handleGenerateOtp(order.orderId)}
                    disabled={loading}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    {loading
                      ? "Sending OTP..."
                      : "Confirm Shipment (Generate OTP)"}
                  </button>

                  {otpVisible[order.orderId] && (
                    <div className="mt-3">
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter OTP"
                        value={otpInputs[order.orderId] || ""}
                        onChange={(e) =>
                          handleOtpChange(order.orderId, e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-md text-sm"
                      />
                      <button
                        onClick={() => handleConfirmShipment(order.orderId)}
                        disabled={loading}
                        className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                      >
                        {loading ? "Verifying..." : "Verify OTP & Confirm"}
                      </button>
                    </div>
                  )}

                  {messages[order.orderId] && (
                    <p className="mt-2 text-sm text-blue-600">
                      {messages[order.orderId]}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No confirmed orders to ship.</p>
        )}
      </div>
    </div>
  );
}
