import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../../store/slices/productSlice";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";

export default function Home() {
  const dispatch = useDispatch();
  const { error, loading, products } = useSelector((state) => state.product);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  const handleCardClick = (product) => {
    navigate(`/product/${product.productId}`, { state: { product } }); // Navigate to SingleProduct with product data
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-yellow-100 to-pink-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
       

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {products.map((product) => (
            <Card
              key={product.productId}
              className="rounded-lg shadow-lg hover:shadow-2xl transition border p-0 border-gray-400"
              onClick={() => handleCardClick(product)}
            >
              {/* Product Image */}
              <img
                src={product.mediaUrl || "/placeholder.jpg"}
                alt={product.name}
                className="rounded-t-lg w-full h-56 object-cover"
              />

              {/* Product Details */}
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-1 text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-emerald-600">
                  {product.price} {product.priceUnit}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}