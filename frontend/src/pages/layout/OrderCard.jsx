import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusMap = {
  Pending: { label: "Pending", color: "bg-yellow-500 text-white" },
  Accepted: { label: "Accepted", color: "bg-blue-500 text-white" },
  Shipped: { label: "Shipped", color: "bg-purple-500 text-white" },
  Delivered: { label: "Delivered", color: "bg-green-500 text-white" },
  Cancelled: { label: "Cancelled", color: "bg-red-500 text-white" },
  Refunded: { label: "Refunded", color: "bg-gray-500 text-white" },
};

export default function OrderCard({ order, onClick }) {
  return (
    <Card
      key={order.orderId}
      className="cursor-pointer pt-0 hover:shadow-lg transition-shadow border border-gray-400 rounded-lg overflow-hidden"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-200">
        <img
          src={order.productMediaUrl || "/placeholder.jpg"}
          alt={order.productTitle}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Content */}
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold text-gray-800 truncate">
          {order.productTitle}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 mb-2 truncate">
          Order ID: {order.orderId}
        </CardDescription>
        <div className="flex items-center justify-between mt-4">
          {/* Order Status */}
          <Badge
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              statusMap[order.orderStatus]?.color || "bg-gray-300 text-gray-800"
            }`}
          >
            {statusMap[order.orderStatus]?.label || "Unknown"}
          </Badge>

          {/* Order Date */}
          <p className="text-xs text-gray-500">
            {new Date(order.orderedAt).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}