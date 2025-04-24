import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../../store/slices/productSlice";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../layout/ProductCard";

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
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100">
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold mb-6 lg:mb-8 text-center  text-gray-800">
          Explore Our Products
        </h2>
        <div className="grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  mx-auto">
          {products.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              onClick={() => handleCardClick(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}