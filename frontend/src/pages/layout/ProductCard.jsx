import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductCard({ product, onClick }) {
  return (
    <Card
      key={product.productId}
      className="rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-300 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="w-full bg-gray-200 h-40 sm:h-48 flex items-center justify-center">
        <img
          src={product.mediaUrl || "/placeholder.jpg"}
          alt={product.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.title}
        </h2>
       
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-emerald-600">
            {product.price} {product.priceUnit || "ETH"}
          </p>
          <p className="text-xs text-gray-500">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}