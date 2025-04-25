import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { handleUnauthorizedStatus } from "../../util/HandleUnauthorizedStatus";
import { handleFileUpload } from "../../util/CloudinaryFileUpload";
import { Loader2 } from "lucide-react"; // Spinner for loading indicator

const UpdateUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [fullName, setFullName] = useState(user.fullName || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar || "");
  const [loading, setLoading] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false); // Toggle for password fields

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!fullName) {
      toast.error("Full Name is required!");
      return;
    }

    if (showPasswordFields && (!password || !confirmPassword)) {
      toast.error("Password fields are required!");
      return;
    }

    if (showPasswordFields && password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const formData = {};
      if (fullName !== user.fullName) formData.fullName = fullName;

      if (showPasswordFields) {
        formData.password = password;
      }
      if (avatar) {
        const url = await handleFileUpload(avatar);
        formData.avatar = url;
      }

      updateUser(formData);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (payload) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/update?userId=${user.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      handleUnauthorizedStatus(response);
      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("User updated successfully!");
      } else {
        toast.error("Failed to update user. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <form
        onSubmit={handleUpdateProfile}
        className="bg-white border-gray-400 border shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-lg space-y-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Update Profile
        </h1>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-24 h-24 rounded-full mb-4 shadow-md hover:opacity-90 transition"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4 shadow-md">
              <span className="text-gray-500">No Avatar</span>
            </div>
          )}
          <Label
            htmlFor="avatar"
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Change Avatar
          </Label>
          <Input
            id="avatar"
            type="file"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        {/* Full Name */}
        <div>
          <Label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="mt-2 w-full"
          />
        </div>

        {/* Toggle Password Fields */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={showPasswordFields}
              onChange={(e) => setShowPasswordFields(e.target.checked)}
              className="form-checkbox"
            />
            Update Password
          </label>
        </div>

        {/* Password Fields (Conditional) */}
        {showPasswordFields && (
          <>
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a new password"
                className="mt-2 w-full"
              />
            </div>

            <div>
              <Label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="mt-2 w-full"
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className={`w-full py-2 rounded-md flex items-center justify-center ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Updating...
            </>
          ) : (
            "Update Profile"
          )}
        </Button>
      </form>
    </div>
  );
};

export default UpdateUser;