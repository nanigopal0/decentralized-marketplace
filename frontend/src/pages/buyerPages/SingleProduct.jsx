import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Home, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

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
    <div className="bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Product Image */}
        <div className="mb-6">
          <img
            src={product.mediaUrl || "/avatarHolder.jpg"}
            alt={product.title || "Product Image"}
            className="w-full h-auto rounded-md shadow-md"
          />
        </div>

        {/* Product Details */}
        <Card className="shadow-lg">
          <CardContent className="p-6 md:p-10 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {product.title || "Product Title"}
            </h1>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {product.type || ""}
              </Badge>
            </div>

            <p className="text-lg text-gray-600">
              {product.description || "No description available."}
            </p>

            <Separator className="my-4" />

            <div className="space-y-2">
              <p className="text-xl font-semibold text-gray-800">
                Price:{" "}
                <span className="text-green-600">
                 {product.price || "N/A"} {product.priceUnit || ""}
                </span>
              </p>
              <p className="text-lg text-gray-600">
                Stock:{" "}
                <span className="font-medium text-gray-800">
                  {product.stock || "Out of Stock"}
                </span>
              </p>
              <p className="text-lg text-gray-600">
                Expected Delivery:{" "}
                <span className="font-medium text-gray-800">
                  3-5 business days
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <Link to={`/order/product/${product.productId}`}
                state={{ product }}
                className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-6 py-2 rounded-md flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now
              </Link>
              
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SingleProduct;