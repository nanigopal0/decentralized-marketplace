import React from "react";
import {
  FaGithub,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About */}

        {/* Consumer Policy */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Policy</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/terms-of-use">Terms of Use</Link>
            </li>
            <li>
              <Link to="/security-policy">Security</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect with Us</h3>
          <div className="flex space-x-4 text-gray-300 text-xl">
            <Link to="https://github.com/nanigopal0/decentralized-marketplace.git">
              <FaGithub />
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} Smart Market. All rights reserved.
      </div>
    </footer>
  );
}
