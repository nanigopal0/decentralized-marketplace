import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductCard({ product, onClick }) {
  return (
    <Card
      key={product.productId}
      className="rounded-lg pt-0 shadow-md hover:shadow-2xl transition-shadow border border-gray-400 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="w-full aspect-w-16 aspect-h-9 bg-gray-200">
        <img
          src={product.mediaUrl || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.title}
        </h2>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        <p className="text-lg font-bold text-emerald-600">
          {product.price} {product.priceUnit}
        </p>
      </CardContent>
    </Card>
  );
}