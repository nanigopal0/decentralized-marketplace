import React, { useState } from "react";
import { ethers } from "ethers";
import SmartMarketplace from "../contracts/SmartMarketplace.json";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleFileUpload } from "../../util/CloudinaryFileUpload";
import { CONTRACT_ADDRESS } from "../../util/GetContractAddress";
import { handleUnauthorizedStatus } from "../../util/HandleUnauthorizedStatus";
import { pingServer } from "../../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react"; // Spinner for loading indicator

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.0);
  const [productType, setProductType] = useState("");
  const [stock, setStock] = useState(0);
  const [productImage, setProductImage] = useState("");
  const [productImagePreview, setProductImagePreview] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const handleBanner = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProductImagePreview(reader.result);
      setProductImage(file);
    };
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !productType || !stock) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true); // Start loading
    try {
      const imageUrl = await handleFileUpload(productImage);
      const reqdata = {
        title,
        description,
        price,
        type: productType,
        stock,
        sellerId: user.id,
        mediaUrl: imageUrl,
      };

      const data = await addProductToDB(reqdata);
      if (data == null) {
        toast.error("Something went wrong!");
        return;
      }
      await handleAddProductToBlockchain(data.productId, data.price, data.type);

      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setProductType("");
      setStock("");
      setProductImage("");
      setProductImagePreview("");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const addProductToDB = async (reqData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/product/add`,
        {
          method: "POST",
          body: JSON.stringify(reqData),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      handleUnauthorizedStatus(response);
      if (response.status === 401) {
        dispatch(pingServer());
      }
      if (response.status === 201) {
        const data = await response.json();
        toast.success("Product added successfully!");
        return data;
      }
    } catch (error) {
      console.error("Error adding product to DB:", error);
    }
    return null;
  };

  const handleAddProductToBlockchain = async (productId, price, productType) => {
    try {
      if (!window.ethereum) throw new Error("MetaMask not detected");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        SmartMarketplace,
        signer
      );
      const wei = price * 1e18;
      const tx = await contract.listProduct(
        productId,
        wei.toString(),
        productType === "PHYSICAL" ? 0 : 1
      );
      toast.info("Transaction submitted. Waiting for confirmation...");
      await tx.wait();
      toast.success("Product listed on blockchain successfully!");
      navigate("/products");
    } catch (err) {
      console.error("Blockchain listing error:", err);
      toast.error("Blockchain product listing failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleAddProduct}
        className="w-full max-w-3xl bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Add New Product
        </h2>

        {/* Product Title */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Product Title
          </Label>
          <Input
            type="text"
            placeholder="Enter product title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full"
          />
        </div>

        {/* Description */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Description
          </Label>
          <Textarea
            placeholder="Enter product description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full"
          />
        </div>

        {/* Stock */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Stock
          </Label>
          <Input
            type="number"
            placeholder="Enter stock count..."
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="mt-2 w-full"
          />
        </div>

        {/* Product Type */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Product Type
          </Label>
          <Select
            value={productType}
            onValueChange={(selectedValue) => setProductType(selectedValue)}
            className="mt-2"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Product Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PHYSICAL">Physical</SelectItem>
              <SelectItem value="DIGITAL">Digital</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Price (ETH)
          </Label>
          <Input
            type="number"
            placeholder="Enter price in ETH..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-2 w-full"
          />
        </div>

        {/* Product Image */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Product Image
          </Label>
          <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4">
            {productImagePreview ? (
              <img
                src={productImagePreview}
                alt="Product Preview"
                className="h-48 w-full object-cover rounded-lg"
              />
            ) : (
              <p className="text-gray-500">No image selected</p>
            )}
            <Input
              type="file"
              onChange={handleBanner}
              className="mt-4 w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-md flex items-center justify-center ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Adding Product...
              </>
            ) : (
              "Add Product"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;