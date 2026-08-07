import { useEffect } from "react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | PriceTrack";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Legal Document
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-light text-gray-900 mt-4 mb-2">
              Privacy Policy
            </h1>
            <p className="text-xs text-gray-400 font-light">Last updated: August 2026</p>
          </div>

          <div className="prose prose-indigo text-gray-600 text-sm leading-relaxed space-y-6 font-light">
            <p>
              At <strong>PriceTrack</strong>, we prioritize your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website, browser extension, and price alert services.
            </p>

            <h2 className="text-lg font-medium text-gray-900">1. Information We Collect</h2>
            <p>
              We only collect essential data required to provide real-time price tracking:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Account Information:</strong> Your name and email address when you register an account.</li>
              <li><strong>Tracked Products:</strong> Product URLs, target prices, and wishlists you create on PriceTrack.</li>
              <li><strong>Technical Data:</strong> Anonymized browser version, device type, and login timestamps to ensure service security.</li>
            </ul>

            <h2 className="text-lg font-medium text-gray-900">2. How We Use Your Data</h2>
            <p>
              Your data is exclusively used for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Sending automated price drop email notifications when a tracked item reaches your target price.</li>
              <li>Syncing your saved products between your browser extension and dashboard.</li>
              <li>Improving price tracking accuracy and algorithm performance.</li>
            </ul>

            <h2 className="text-lg font-medium text-gray-900">3. Data Sharing & Security</h2>
            <p>
              <strong>We never sell, rent, or trade your personal information.</strong> Your password is hashed using industry-standard bcrypt encryption, and API tokens are securely verified over SSL/TLS connections.
            </p>

            <h2 className="text-lg font-medium text-gray-900">4. Contact Us</h2>
            <p>
              If you have any questions or requests regarding your data, please contact our support team at{" "}
              <a href="mailto:support@pricetrack.in" className="text-indigo-600 font-medium underline">
                support@pricetrack.in
              </a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
