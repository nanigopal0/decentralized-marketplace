import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { handleUnauthorizedStatus } from "../../util/HandleUnauthorizedStatus";
import ProductCard from "../layout/ProductCard";

export default function SearchResults() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the search query from the URL
  const query = new URLSearchParams(location.search).get("query");

  async function fetchSearchResults() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/product/search?keyword=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      handleUnauthorizedStatus(response);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }

  const handleCardClick = (product) => {
    navigate(`/product/${product.productId}`, { state: { product } }); // Navigate to SingleProduct with product data
  };

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Search Results for "{query}"
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            onClick={() => handleCardClick(product)}
          />
        ))}
      </div>
    </div>
  );
}
