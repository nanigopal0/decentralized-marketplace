import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductCard({ product, onClick }) {
  return (
    <Card
      key={product.productId}
      className="rounded-lg shadow-lg hover:shadow-2xl transition border p-0 border-gray-400"
      onClick={onClick}
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
          {product.title}
        </h2>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <p className="text-lg font-bold text-emerald-600">
          {product.price} {product.priceUnit}
        </p>
      </CardContent>
    </Card>
  );
}