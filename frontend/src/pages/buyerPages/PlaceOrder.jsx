import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { pingServer } from "../../../store/slices/userSlice";
import { handleUnauthorizedStatus } from "../../util/HandleUnauthorizedStatus";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react"; // Spinner for loading indicator
import Big from "big.js";

export default function PlaceOrder() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(1); // Quantity state
  const location = useLocation();
  const { product } = location.state || {}; // Get product from location state
  const totalPrice = Big(product.price || 0).times(quantity).toString(); // Calculate total price using Big.js
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const placeOrder = async () => {
    try {
      setLoading(true);
      setMessage("Placing order...");

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
      handleUnauthorizedStatus(response);
      if (response.status === 401) {
        dispatch(pingServer());
      }
      if (response.status === 202) {
        const data = await response.json();
        toast.success(
          "Order placed successfully! Pay the amount to accept the order."
        );
        navigate("/payment", { state: { order: data, product } });
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-red-500">
          No product details available.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-4xl shadow-xl rounded-lg">
        <CardContent className="p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
            Place Your Order
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Product Image */}
            <img
              src={product.mediaUrl || "/placeholder.jpg"}
              alt={product.title || "Product Image"}
              className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-lg shadow-md"
            />

            {/* Product Details */}
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800">
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
                  {totalPrice} {product.priceUnit || ""}
                </span>
              </p>

              {/* Place Order Button */}
              <Button
                onClick={placeOrder}
                disabled={loading}
                className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Placing Order...
                  </>
                ) : (
                  "Place Order"
                )}
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