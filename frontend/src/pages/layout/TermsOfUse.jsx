import React from "react";

export default function TermsOfUse() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen py-10 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-amber-700">Terms of Use</h1>
        <p className="mb-4">
          Welcome to <strong>SmartMarket</strong>, your decentralized smart
          marketplace. By using our platform, you agree to the following terms
          and conditions. Please read them carefully.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Acceptance of Terms
        </h2>
        <p className="mb-4">
          By accessing or using SmartMarket, you agree to be bound by these
          Terms of Use and our Privacy Policy. If you do not agree with any part
          of the terms, you may not use our platform.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. Decentralized Transactions
        </h2>
        <p className="mb-4">
          All transactions conducted through SmartMarket are decentralized and
          governed by smart contracts on the blockchain. We do not have control
          over, nor can we reverse, blockchain transactions.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          3. User Responsibilities
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            You are responsible for securing your wallet and private keys.
          </li>
          <li>
            You must ensure the accuracy of all data entered during
            transactions.
          </li>
          <li>
            You may not use SmartMarket for illegal or fraudulent activities.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          4. Smart Contract Risks
        </h2>
        <p className="mb-4">
          You acknowledge and accept the risks of using smart contracts,
          including but not limited to bugs, exploits, and gas fee fluctuations.
          Use at your own risk.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          5. Cancellations & Refunds
        </h2>
        <p className="mb-4">
          Orders cannot be canceled after confirmation unless otherwise allowed
          by the smart contract logic. Refunds, if applicable, will be processed
          according to smart contract rules.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          6. Limitation of Liability
        </h2>
        <p className="mb-4">
          SmartMarket shall not be liable for any loss, damage, or inconvenience
          arising from the use or inability to use the platform, including
          issues related to blockchain technology.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify these Terms of Use at any time. Changes
          will be posted on this page, and your continued use of the platform
          constitutes acceptance of the updated terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact</h2>
        <p className="mb-4">
          If you have any questions or concerns regarding these terms, feel free
          to contact us at{" "}
          <a
            href="mailto:support@smartmarket.com"
            className="text-blue-600 hover:underline"
          >
            support@smartmarket.com
          </a>
          .
        </p>

        <p className="text-sm text-gray-500 mt-6">
          Last updated: April 24, 2025
        </p>
      </div>
    </div>
  );
}
