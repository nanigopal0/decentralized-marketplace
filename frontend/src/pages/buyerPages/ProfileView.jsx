import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileView() {
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    role: "Buyer", // or 'Seller'
    walletAddress: "0x12345abcde12345abcde12345abcde12345",
  });

  // Fetch profile data from backend (simulated)
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Example API endpoint: replace with actual API call
        const response = await axios.get("/api/user/profile");
        // setProfileData(response.data); // Assuming the backend returns data like demo data
        setProfileData(profileData); // Assuming the backend returns data like demo data
      } catch (err) {
        console.error("Error fetching profile data", err);
      }
    };

    fetchProfileData();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="profile-container p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Your Profile</h1>

      <div className="profile-info">
        <div className="flex justify-between mb-4">
          <div className="flex-1">
            <label className="block font-medium">Full Name</label>
            <p className="text-gray-700">{profileData.fullName}</p>
          </div>
          <div className="flex-1">
            <label className="block font-medium">Email</label>
            <p className="text-gray-700">{profileData.email}</p>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="flex-1">
            <label className="block font-medium">Role</label>
            <p className="text-gray-700">{profileData.role}</p>
          </div>
          <div className="flex-1">
            <label className="block font-medium">Wallet Address</label>
            <p className="text-gray-700">{profileData.walletAddress}</p>
          </div>
        </div>
      </div>

      {/* Edit Profile Button (For future functionality if needed) */}
      <div className="mt-6 text-center">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
