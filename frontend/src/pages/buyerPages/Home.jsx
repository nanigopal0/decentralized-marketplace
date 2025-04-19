import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "2.5 ETH",
    description: "High-fidelity wireless headphones with noise cancellation.",
    rating: 4.7,
    purchases: 124,
    image: "https://images.unsplash.com/photo-1585386959984-a4155228f9a6",
  },
  {
    id: 2,
    name: "Smartphone",
    price: "3 ETH",
    description:
      "Latest-gen smartphone with powerful processor and amazing camera.",
    rating: 4.5,
    purchases: 98,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },
  {
    id: 3,
    name: "Gaming Laptop",
    price: "7 ETH",
    description:
      "High-performance laptop designed for gaming and productivity.",
    rating: 4.8,
    purchases: 77,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  },
  {
    id: 4,
    name: "4K Action Camera",
    price: "1.2 ETH",
    description:
      "Capture your adventures with ultra-clear 4K video and wide angle lens.",
    rating: 4.6,
    purchases: 65,
    image: "https://images.unsplash.com/photo-1533400925032-cf0b15f7cba2",
  },
  {
    id: 5,
    name: "Smart Watch",
    price: "1.8 ETH",
    description: "Track your fitness, notifications, and health with style.",
    rating: 4.4,
    purchases: 153,
    image: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: "0.9 ETH",
    description: "Portable speaker with deep bass and 12 hours of playtime.",
    rating: 4.3,
    purchases: 89,
    image: "https://images.unsplash.com/photo-1606813904972-0048de5f5c35",
  },
  {
    id: 7,
    name: "VR Headset",
    price: "5 ETH",
    description:
      "Immersive virtual reality experience with wide compatibility.",
    rating: 4.7,
    purchases: 72,
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
  },
  {
    id: 8,
    name: "Mechanical Keyboard",
    price: "1.1 ETH",
    description:
      "Responsive keys and RGB lighting perfect for coding and gaming.",
    rating: 4.5,
    purchases: 110,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  },
];

export default function Home() {

  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchProducts();
  },[])




  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">
        Smart Marketplace
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <Card
            key={product.id}
            className="rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="rounded-t-2xl w-full h-56 object-cover"
            />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-2">
                {product.description}
              </p>
              <p className="text-lg font-bold text-emerald-600">
                {product.price}
              </p>
              <div className="flex items-center mt-2 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      product.rating > i ? "fill-current" : "text-gray-300"
                    }`}
                    fill={product.rating > i ? "currentColor" : "none"}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  {product.rating} ({product.purchases})
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <footer className="mt-20 py-6 bg-gradient-to-r from-emerald-500 to-teal-400 text-white text-center text-sm shadow-inner">
        &copy; {new Date().getFullYear()} Smart Marketplace. All rights
        reserved.
      </footer>
    </div>
  );
}
