import { useState, useEffect } from "react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import Toast from "../components/Toast";

export default function ContactUs() {
  useEffect(() => {
    document.title = "Contact Us | PriceTrack";
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setToast({ message: "Thank you! Your message has been sent. We'll reply within 24 hours.", type: "success" });
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Get In Touch
          </span>
          <h1 className="font-display text-4xl font-light text-gray-900 leading-snug">
            We'd love to <span className="italic text-indigo-600">hear from you.</span>
          </h1>
          <p className="text-gray-500 font-light text-sm leading-relaxed">
            Have a question about tracking a product, feature request, or feedback? Send us a message and our team will respond shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info cards */}
          <div className="space-y-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-0.5">Email Support</h3>
                <p className="text-xs text-gray-400 font-light mb-1">Direct support channel</p>
                <a href="mailto:support@pricetrack.in" className="text-xs text-indigo-600 font-medium hover:underline">
                  support@pricetrack.in
                </a>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-0.5">Response Time</h3>
                <p className="text-xs text-gray-400 font-light mb-1">Mon – Sat, 9am – 6pm IST</p>
                <span className="text-xs text-gray-600 font-light">Within 24 hours guaranteed</span>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-0.5">Help & FAQ</h3>
                <p className="text-xs text-gray-400 font-light mb-1">Common queries resolved</p>
                <a href="/#faq" className="text-xs text-indigo-600 font-medium hover:underline">
                  Visit FAQ section →
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Rahul Sharma"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-light placeholder:text-gray-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-light placeholder:text-gray-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can we help?"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-light placeholder:text-gray-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you need assistance with..."
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-light placeholder:text-gray-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 text-white font-medium text-sm py-3.5 rounded-xl shadow-md shadow-indigo-200 transition-all"
              >
                {loading ? "Sending message..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </main>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <Footer />
    </div>
  );
}
