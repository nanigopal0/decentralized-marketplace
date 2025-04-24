import React from "react";

export default function SecurityPolicy() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen py-10 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-amber-700">
          Security Policy
        </h1>

        <p className="mb-4">
          At <strong>SmartMarket</strong>, security is a top priority. Our
          platform leverages the inherent security of blockchain technology
          while implementing additional measures to safeguard users,
          transactions, and data.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Smart Contract Security
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>All smart contracts are thoroughly audited before deployment.</li>
          <li>
            We follow best practices in Solidity development, including
            checks-effects-interactions and reentrancy protection.
          </li>
          <li>
            Key contract functions are protected using access control
            mechanisms.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. User Wallet Safety
        </h2>
        <p className="mb-4">
          SmartMarket does not store private keys or sensitive wallet
          information. All transactions are initiated directly from the user's
          wallet using MetaMask or other Web3 providers.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          3. Secure Data Handling
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            Minimal data is collected, and we avoid storing personal data unless
            required for communication (like email).
          </li>
          <li>
            All communication between your browser and our servers is encrypted
            using HTTPS.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          4. Escrow & OTP Verification
        </h2>
        <p className="mb-4">
          For marketplace transactions, we use an escrow-based model where funds
          are only released after delivery confirmation. OTP-based verification
          adds an additional layer of protection for fund release.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          5. Platform Monitoring
        </h2>
        <p className="mb-4">
          We monitor the platform for unusual activity and potential exploits.
          In the event of a detected issue, smart contract functionality can be
          paused to prevent further impact.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          6. Reporting Vulnerabilities
        </h2>
        <p className="mb-4">
          We encourage responsible disclosure. If you discover a potential
          vulnerability or exploit in our smart contracts or app, please contact
          us at{" "}
          <a
            href="mailto:security@smartmarket.com"
            className="text-blue-600 hover:underline"
          >
            security@smartmarket.com
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          7. Third-Party Dependencies
        </h2>
        <p className="mb-4">
          We use trusted libraries and packages such as Ethers.js, and routinely
          update our dependencies to patch known vulnerabilities.
        </p>

        <p className="text-sm text-gray-500 mt-6">
          Last updated: April 24, 2025
        </p>
      </div>
    </div>
  );
}
