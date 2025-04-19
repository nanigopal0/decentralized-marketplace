import React, { useEffect, useState } from "react";
import axios from "axios";

const statusMap = {
  0: "Pending",
  1: "Accepted",
  2: "Shipped",
  3: "Delivered",
  4: "Refunded",
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        // Fetch Order History From Backend
        /*const response = await axios.get("/api/orders?buyer=0x123");
        const enrichedOrders = await Promise.all(
          response.data.map(async (order) => {
            const productRes = await axios.get(
              `/api/products/${order.productId}`
            );
            return { ...order, product: productRes.data };
          })
        );
        setOrders(enrichedOrders);*/

        // Demo data
        const demoOrders = [
          {
            orderId: 1,
            productId: "prod1",
            status: 3,
            createdAt: 1713400000,
            shippedAt: 1713480000,
            product: {
              name: "Noise ColorFit Ultra Smartwatch",
              price: 2999,
              imageUrl:
                "https://m.media-amazon.com/images/I/61ZUjF5+xpL._SX679_.jpg",
            },
          },
          {
            orderId: 2,
            productId: "prod2",
            status: 2,
            createdAt: 1713500000,
            shippedAt: 1713550000,
            product: {
              name: "Samsung Galaxy Buds2 Pro",
              price: 9999,
              imageUrl:
                "https://m.media-amazon.com/images/I/51+4GZjN9zL._SX679_.jpg",
            },
          },
          {
            orderId: 3,
            productId: "prod3",
            status: 1,
            createdAt: 1713600000,
            shippedAt: 0,
            product: {
              name: "Boat Rockerz 255 ANC Neckband",
              price: 1799,
              imageUrl:
                "https://m.media-amazon.com/images/I/61zNjdWp+VL._SX679_.jpg",
            },
          },
        ];

        setOrders(demoOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition-all"
          >
            <img
              src={order.product.imageUrl}
              alt={order.product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{order.product.name}</h3>
            <p className="text-gray-600">Product ID: {order.productId}</p>
            <p className="text-gray-600">Price: ₹{order.product.price}</p>
            <p className="text-gray-600">Status: {statusMap[order.status]}</p>
            <p className="text-gray-500 text-sm">
              Ordered At: {new Date(order.createdAt * 1000).toLocaleString()}
            </p>
            {order.shippedAt > 0 && (
              <p className="text-gray-500 text-sm">
                Shipped At: {new Date(order.shippedAt * 1000).toLocaleString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
