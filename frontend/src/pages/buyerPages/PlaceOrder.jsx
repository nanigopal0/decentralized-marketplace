import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

export default function PlaceOrder() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(1); // Quantity state
  const location = useLocation();
  const { product } = location.state || {}; // Get product from location state
  const totalPrice = (product.price || 0) * quantity;

  if (!product) {
    return <p className="text-center mt-10">No product details available.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl shadow-xl">
        <CardContent className="p-6 md:p-10">
          <h2 className="text-2xl font-bold text-center mb-6">
            Place Your Order
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Product Image */}
            <img
              src={product.mediaUrl || "/placeholder.jpg"}
              alt={product.title || "Product Image"}
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />

            {/* Product Details */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">
                {product.title || "Product Name"}
              </h3>
              <p className="text-gray-600 mb-4">
                {product.description || "No description available."}
              </p>

              <Separator className="my-4" />

              <p className="text-lg font-bold text-gray-800">
                Price per unit:{" "}
                <span className="text-green-600">
                  {product.price || "N/A"} {product.priceUnit || ""}
                </span>
              </p>

              {/* Quantity Field */}
              <div className="mt-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  } // Ensure quantity is at least 1
                  className="mt-1 w-24"
                />
              </div>

              {/* Total Price */}
              <p className="text-lg font-bold text-gray-800 mt-4">
                Total Price:{" "}
                <span className="text-green-600">
                  {totalPrice.toFixed(2)} {product.priceUnit || ""}
                </span>
              </p>

              {/* Place Order Button */}
              <Button
                asChild
                // onClick={handlePlaceOrder}
                disabled={loading}
                className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                <Link to="/payment" state={{ product, quantity }}>
                  {loading ? "Placing Order..." : "Place Order"}
                </Link>
              </Button>

              {/* Message */}
              {message && (
                <p className="mt-4 text-center text-gray-700">{message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
