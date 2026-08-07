import { useEffect } from "react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

export default function TermsOfService() {
  useEffect(() => {
    document.title = "Terms of Service | PriceTrack";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Legal Agreement
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-light text-gray-900 mt-4 mb-2">
              Terms of Service
            </h1>
            <p className="text-xs text-gray-400 font-light">Last updated: August 2026</p>
          </div>

          <div className="prose prose-indigo text-gray-600 text-sm leading-relaxed space-y-6 font-light">
            <p>
              Welcome to <strong>PriceTrack</strong>. By accessing our website, dashboard, or browser extension, you agree to comply with and be bound by the following Terms of Service.
            </p>

            <h2 className="text-lg font-medium text-gray-900">1. Description of Service</h2>
            <p>
              PriceTrack provides real-time e-commerce price monitoring, price history analytics, competitor price comparisons, and email alert notifications for publicly available online products.
            </p>

            <h2 className="text-lg font-medium text-gray-900">2. User Account Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You must provide accurate and valid contact details to ensure reliable price drop notifications.</li>
              <li>Misuse of automated queries or scraping attempts against PriceTrack servers is prohibited.</li>
            </ul>

            <h2 className="text-lg font-medium text-gray-900">3. Price Accuracy Disclaimer</h2>
            <p>
              Product prices and availability are updated periodically based on public seller data on third-party platforms (such as Amazon, Flipkart, and Myntra). While we strive for 100% accuracy, third-party sellers may alter prices at any time. Final purchases occur directly on the respective seller's official store.
            </p>

            <h2 className="text-lg font-medium text-gray-900">4. Modifications to Service</h2>
            <p>
              We reserve the right to modify, update, or discontinue features of PriceTrack at any time without prior notice.
            </p>

            <h2 className="text-lg font-medium text-gray-900">5. Contact Information</h2>
            <p>
              For inquiries regarding these terms, reach out to us at{" "}
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
