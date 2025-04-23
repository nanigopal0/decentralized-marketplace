import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "../../App.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

export default function Register({ className, ...props }) {
  const [role, setRole] = useState(null); // Default role is "buyer"
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here
    if (!role) {
      setError("Please select a role."); // Show error if no role is selected
      return;
    }
   
    const payload = {
      fullName: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: role, // Use the selected role
      ethereumPublicKey: e.target["ethereumPublicKey"].value,
    };
    registerUser(payload);
  };

  const registerUser = async (payload) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/public/signup`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.status === 201) {
        const data = await response.text();
        console.log(data);
        toast.success("Registration successful! Please log in.");
      } else {
        // Handle error (e.g., show a notification)
        setError(data.message || "Registration failed. Please try again.");
        toast.error(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle error (e.g., show a notification)
      setError("Registration failed. Please try again.");
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-r from-yellow-100 to-pink-100 justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form className="p-6 md:p-8" onSubmit={handleRegister}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome</h1>
                    <p className="text-muted-foreground text-balance">
                      Register to get started
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter Password"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="ethereumPublicKey">
                      Ethereum Public Key
                    </Label>
                    <Input
                      id="ethereumPublicKey"
                      type="text"
                      placeholder="xxxxxxx"
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label
                      htmlFor="role"
                      className="text-sm font-medium text-gray-700"
                    >
                      Select Role
                    </Label>
                    <Select
                      value={role}
                      onValueChange={(value) => {
                        setRole(value);
                        setError(""); // Clear error when a role is selected
                      }}
                    >
                      <SelectTrigger className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                        <SelectValue>
                          {role ? (
                            role
                          ) : (
                            <span className="text-gray-400">Select a role</span>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BUYER">BUYER</SelectItem>
                        <SelectItem value="SELLER">SELLER</SelectItem>
                      </SelectContent>
                    </Select>
                    {error && (
                      <p className="text-sm text-red-500 mt-1">{error}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full">
                    Register
                  </Button>

                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link
                      to={"/login"}
                      className="underline underline-offset-4"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
              <div className="bg-muted relative hidden md:block">
                <img
                  src="/vite.svg"
                  alt="Image"
                  className="absolute inset-0 h-full w-full dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
