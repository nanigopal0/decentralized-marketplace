import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleUnauthorizedStatus } from "../../util/HandleUnauthorizedStatus";
import ProductCard from "../layout/ProductCard";
import { Loader2 } from "lucide-react"; // Spinner for loading indicator

export default function SearchResults() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isSeller = user?.role === "SELLER";

  // Extract the search query from the URL
  const query = new URLSearchParams(location.search).get("query");

  async function fetchSearchResults() {
    setLoading(true); // Start loading
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
    } finally {
      setLoading(false); // Stop loading
    }
  }

  const handleCardClick = (product) => {
    if (isSeller)
      navigate(`/product/details/${product.productId}`, {
        state: { product },
      });
    else navigate(`/product/${product.productId}`); // Navigate to SingleProduct with product data
  };

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
        Search Results for "<span className="text-blue-600">{query}</span>"
      </h1>

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              onClick={() => handleCardClick(product)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">
            No products found for "{query}"
          </p>
          <p className="text-gray-500 mt-2">
            Try searching with a different keyword.
          </p>
        </div>
      )}
    </div>
  );
}
