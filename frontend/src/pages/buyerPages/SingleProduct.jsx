import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Home, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { handleUnauthorizedStatus } from "../../util/HandleUnauthorizedStatus";
import { pingServer } from "../../../store/slices/userSlice";
import { useDispatch } from "react-redux";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getProduct = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/product/get?productId=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      handleUnauthorizedStatus(response);
      if (response.status === 401) {
        dispatch(pingServer());
      }
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch product.");
      }

      const data = await response.json();
      setProduct(data);
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching the product.");
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <div className="bg-gradient-to-r from-yellow-100 to-pink-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Product Image */}
        <div className="mb-6 flex justify-center">
          <img
            src={product.mediaUrl || "/avatarHolder.jpg"}
            alt={product.title || "Product Image"}
            className="w-full max-w-md h-auto rounded-lg shadow-md object-contain"
          />
        </div>

        {/* Product Details */}
        <Card className="shadow-lg">
          <CardContent className="p-6 sm:p-8 lg:p-10 space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {product.title || "Product Title"}
            </h1>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm bg-fuchsia-400">
                {product.type || ""}
              </Badge>
            </div>

            <p className="text-base sm:text-lg text-gray-600">
              {product.description || "No description available."}
            </p>

            <Separator className="my-4" />

            <div className="space-y-2">
              <p className="text-lg sm:text-xl font-semibold text-gray-800">
                Price:{" "}
                <span className="text-green-600">
                  {product.price || "N/A"} {product.priceUnit || ""}
                </span>
              </p>
              <p className="text-base sm:text-lg text-gray-600">
                Stock:{" "}
                <span className="font-medium text-gray-800">
                  {product.stock > 0 ? `${product.stock} available` : "Out of Stock"}
                </span>
              </p>
              <p className="text-base sm:text-lg text-gray-600">
                Expected Delivery:{" "}
                <span className="font-medium text-gray-800">
                  3-5 business days
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <Link
                to={`/order/product/${product.productId}`}
                state={{ product }}
                className="bg-blue-600 text-white hover:bg-blue-700 text-base sm:text-lg px-6 py-2 rounded-md flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now
              </Link>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="text-base sm:text-lg px-6 py-2 rounded-md flex items-center gap-2"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SingleProduct;