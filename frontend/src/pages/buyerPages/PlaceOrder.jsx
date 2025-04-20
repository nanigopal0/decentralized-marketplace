import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function PlaceOrder() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product details from backend
        // const res = await axios.get("/api/demoProduct");
        // setProduct(res.data);

        // Demo response
        const demoData = {
          id: "demo123",
          name: "Wireless Bluetooth Headphones",
          description:
            "High-quality wireless headphones with noise cancellation and 20-hour battery life.",
          price: "0.05",
          estimatedDelivery: "April 25, 2025",
          image:
            "https://images.unsplash.com/photo-1585386959984-a4155224c9f7?auto=format&fit=crop&w=600&q=60",
        };
        setProduct(demoData);
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };

    fetchProduct();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      if (!product) return;
      setLoading(true);
      setMessage("");

      await axios.post("/api/placeOrder", {
        productId: product.id,
        amount: product.price,
        buyer: "0x123", // Replace with wallet address
      });

      setMessage("Order placed successfully!");
    } catch (error) {
      setMessage("Failed to place order. Try again.");
      console.error("Order error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Place Your Order
        </h2>

        {product ? (
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-40 h-40 object-cover rounded-xl shadow-md"
            />

            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="font-bold text-lg">Price: Ξ {product.price}</p>
              <p className="text-sm text-gray-500">
                Expected Delivery: {product.estimatedDelivery}
              </p>

              <button
                onClick={() => navigate(`/payment`)}
                disabled={loading}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>

              {message && (
                <p className="mt-3 text-center text-gray-700">{message}</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center">Loading product details...</p>
        )}
      </div>
    </div>
  );
}
