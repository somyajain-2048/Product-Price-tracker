import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

export default function AboutUs() {
  useEffect(() => {
    document.title = "About Us | PriceTrack";
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { value: "50,000+", label: "Products Tracked" },
    { value: "₹2 Million+", label: "User Savings" },
    { value: "15,000+", label: "Smart Shoppers" },
    { value: "24/7", label: "Automated Checks" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            About PriceTrack
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-gray-900 leading-tight">
            Empowering online shoppers to <span className="italic text-indigo-600">never overpay again.</span>
          </h1>
          <p className="text-gray-500 font-light text-base leading-relaxed">
            PriceTrack was built to bring price transparency to e-commerce. We monitor prices across major Indian online stores 24/7 so you can buy at the lowest point with absolute confidence.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((item) => (
            <div key={item.label} className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
              <p className="font-display text-2xl sm:text-3xl font-light text-indigo-600 mb-1">{item.value}</p>
              <p className="text-xs text-gray-400 font-light uppercase tracking-wider">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
          <h2 className="font-display text-2xl font-light text-gray-900">Our Mission</h2>
          <p className="text-gray-600 text-sm font-light leading-relaxed">
            E-commerce pricing fluctuates constantly—often multiple times a day during sales and festive seasons. Shoppers frequently buy right before a price drop or miss out on limited-time discounts.
          </p>
          <p className="text-gray-600 text-sm font-light leading-relaxed">
            PriceTrack solves this by automatically tracking product prices on Amazon, Flipkart, Myntra, and more. When a price reaches your target, our engine alerts you instantly via email so you get the best deal every single time.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium text-sm px-6 py-3 rounded-xl shadow-md shadow-indigo-200 transition-all"
            >
              Start Tracking Free
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 font-medium text-sm px-6 py-3 rounded-xl hover:bg-gray-100 transition-all"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
