import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../layout/Sidebar";

export default function ProfileView() {
  const [profileData, setProfileData] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchProfileData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/get?id=${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch profile data.");
      }
      const data = await response.json();
      setProfileData(data);
    } catch (err) {
      console.error("Error fetching profile data", err);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100 flex">
      <Sidebar />
      <div className="flex items-center justify-center flex-1 p-6">
        <Card className="w-full max-w-3xl shadow-lg border border-gray-300 bg-white rounded-lg">
          <CardContent className="p-6 md:p-10">
            <div className="text-center">
              {/* Profile Image */}
              {profileData.avatar ? (
                <img
                  src={profileData.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-2 border-gray-300 mx-auto mb-4 shadow-md"
                />
              ) : (
                <User className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300 mb-4 shadow-md text-gray-500" />
              )}
              <h1 className="text-3xl font-bold text-gray-800">
                {profileData.fullName || "Full Name"}
              </h1>
              <p className="text-gray-600">{profileData.email || "Email"}</p>
            </div>

            <Separator className="my-6" />

            {/* Profile Information */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-700">
                    Role
                  </label>
                  <p className="text-gray-800">{profileData.role || "N/A"}</p>
                </div>
                <div>
                  <label className="block font-medium text-gray-700">
                    Wallet Address
                  </label>
                  <p className="text-gray-800 break-all">
                    {profileData.walletAddress || "N/A"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-700">
                    Created At
                  </label>
                  <p className="text-gray-800">
                    {profileData.createdAt
                      ? new Date(profileData.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="mt-6 text-center">
              <Link
                to={`/user/update/${user.id}`}
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md shadow-md"
              >
                Edit Profile
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}