import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { handleUnauthorizedStatus } from "../../util/HandleUnauthorizedStatus";
import { pingServer } from "../../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react"; // Spinner for loading indicator

export default function ProfileView() {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const fetchProfileData = async () => {
    setLoading(true); // Start loading
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
      handleUnauthorizedStatus(response);
      if (response.status === 401) {
        dispatch(pingServer());
      }
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        throw new Error(response.status + " Failed to fetch profile data.");
      }
    } catch (err) {
      console.error("Error fetching profile data", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 to-pink-100">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-3xl shadow-lg border border-gray-300 bg-white rounded-lg">
        <CardContent className="p-6 sm:p-8 lg:p-10">
          <div className="text-center">
            {/* Profile Image */}
            {profileData.avatar ? (
              <img
                src={profileData.avatar}
                alt="Profile"
                className="w-32 h-32 sm:w-40 object-cover sm:h-40 rounded-full border-2 border-gray-300 mx-auto mb-4 shadow-md"
              />
            ) : (
              <User className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto border-2 border-gray-300 mb-4 shadow-md text-gray-500" />
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {profileData.fullName || "Full Name"}
            </h1>
            <p className="text-gray-600">{profileData.email || "Email"}</p>
          </div>

          <Separator className="my-6" />

          {/* Profile Information */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-700">Role</label>
                <p className="text-gray-800">{profileData.role || "N/A"}</p>
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Wallet Address
                </label>
                <p className="text-gray-800 break-all">
                  {profileData.ethereumPublicKey || "N/A"}
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
  );
}