import { Link } from "react-router-dom";

export default function CTABanner() {
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-16 -translate-y-16 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-24 translate-y-24 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-[10px] font-medium text-white/50 uppercase tracking-[0.2em] mb-6">
          Get started today
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-light text-white mb-4 tracking-tight">
          Ready to start saving?
        </h2>
        <p className="text-white/55 text-base font-light mb-8 max-w-md mx-auto leading-relaxed">
          Join 15,000+ smart shoppers already tracking prices and saving money every day.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-50 px-8 py-4 rounded-2xl shadow-xl shadow-indigo-900/20 hover:-translate-y-0.5 transition-all"
          >
            Get started — it's free
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center text-sm font-light text-white/70 border border-white/25 hover:bg-white/8 px-8 py-4 rounded-2xl transition-all"
          >
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </section>
  );
}
