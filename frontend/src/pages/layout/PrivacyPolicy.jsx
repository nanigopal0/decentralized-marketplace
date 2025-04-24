import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen py-10 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-amber-700">
          Privacy Policy
        </h1>

        <p className="mb-4">
          At <strong>SmartMarket</strong>, we respect your privacy and are
          committed to protecting your personal information. This Privacy Policy
          explains how we collect, use, and secure your data.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          Since SmartMarket is a decentralized platform, we do not collect
          traditional user data like names, addresses, or passwords. However, we
          may collect the following:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Public wallet addresses for identifying transactions.</li>
          <li>
            Email addresses if voluntarily provided (e.g., support requests).
          </li>
          <li>
            Basic analytics to understand platform usage trends (anonymized).
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">
          The limited information we collect is used solely for:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Improving user experience and platform performance.</li>
          <li>Providing customer support.</li>
          <li>Ensuring the security and integrity of the platform.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. No Data Sharing</h2>
        <p className="mb-4">
          We do not sell, rent, or share your information with third parties,
          except where required by law or in cases of fraud investigation.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Security</h2>
        <p className="mb-4">
          We implement industry-standard security measures to protect any
          information transmitted to or from SmartMarket. However, we are not
          responsible for the security of blockchain transactions or external
          wallet services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
        <p className="mb-4">
          You can contact us at any time to access, update, or delete your
          information that we may have collected (such as your email address).
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Cookies</h2>
        <p className="mb-4">
          We may use cookies for analytics and performance enhancement. You can
          disable cookies via your browser settings.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          7. Changes to This Policy
        </h2>
        <p className="mb-4">
          This Privacy Policy may be updated periodically. Changes will be
          posted on this page with a revised "Last updated" date.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact</h2>
        <p className="mb-4">
          For any questions about this Privacy Policy, please contact us at:{" "}
          <a
            href="mailto:privacy@smartmarket.com"
            className="text-blue-600 hover:underline"
          >
            privacy@smartmarket.com
          </a>
        </p>

        <p className="text-sm text-gray-500 mt-6">
          Last updated: April 24, 2025
        </p>
      </div>
    </div>
  );
}
