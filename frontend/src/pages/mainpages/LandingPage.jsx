import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Decentralized Marketplace</h1>
        <p className="text-lg mb-6">
          Discover, buy, and sell products securely on our decentralized platform.
        </p>
        <Link to="/login">
        <Button className="px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          Get Started
        </Button>
        </Link>
      </section>

      {/* Inspirational Quote Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            "Empowering communities through trustless commerce and innovation."
          </h2>
          <p className="text-lg text-gray-600">
            Our platform is designed to bring people together, enabling secure and transparent transactions in a decentralized world.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-12 bg-gray-100">
        <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
        <p className="text-lg mb-6">
          Start exploring the decentralized marketplace now.
        </p>
        <Link to="/register">
        <Button className="bg-blue-600 text-white hover:bg-blue-700">
          Sign Up
        </Button>
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;