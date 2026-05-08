import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

/* ── Shared left panel ───────────────────────────────────── */
function BrandPanel() {
  const perks = [
    { icon: "🆓", label: "Always free", desc: "No credit card. No trial period. Just sign up and start tracking." },
    { icon: "⚡", label: "Instant alerts", desc: "We email you the second a price drops to your target." },
    { icon: "🔒", label: "Secure & private", desc: "Your data is encrypted and never shared with third parties." },
  ];

  return (
    <div
      className="hidden lg:flex flex-col justify-between h-full p-10 xl:p-14"
      style={{ background: "linear-gradient(145deg, #1a1754 0%, #2e28a0 45%, #5b21b6 100%)" }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 w-fit">
        <div className="w-8 h-8 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <span className="font-display text-white text-lg font-normal tracking-tight">PriceTrack</span>
      </Link>

      {/* Headline */}
      <div>
        <h2 className="font-display text-3xl xl:text-4xl font-light text-white leading-snug mb-3">
          Never overpay<br />
          <span className="italic text-violet-300">for anything, ever again.</span>
        </h2>
        <p className="text-white/50 text-sm font-light leading-relaxed mb-10">
          Join 15,000+ smart shoppers who let PriceTrack do the watching.
        </p>

        <div className="space-y-5">
          {perks.map((p, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 text-sm">
                {p.icon}
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium mb-0.5">{p.label}</p>
                <p className="text-white/45 text-xs font-light leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-white/8 border border-white/12 rounded-2xl p-5">
        <p className="text-white/65 text-sm font-light leading-relaxed italic mb-3">
          "Saved ₹8,000 on a laptop I'd been eyeing for months. PriceTrack sent the alert, I bought it within the hour."
        </p>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-medium">R</div>
          <div>
            <p className="text-white/70 text-xs font-medium">Rahul M.</p>
            <p className="text-white/35 text-[10px] font-light">Bangalore</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Signup page ─────────────────────────────────────────── */
export default function Signup() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/dashboard", { replace: true });
  }, []);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/signup", formData);
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="lg:w-[42%] xl:w-[38%] flex-shrink-0">
        <BrandPanel />
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-5 py-12">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <span className="font-display text-base font-normal bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">PriceTrack</span>
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-light text-gray-900 mb-1.5">Create your account</h1>
            <p className="text-sm text-gray-400 font-light">Free forever. No credit card required.</p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-600 font-light">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1.5">
                Full name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Priya Sharma"
                required
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-light placeholder:text-gray-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1.5">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-light placeholder:text-gray-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  required
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm text-gray-700 font-light placeholder:text-gray-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {/* Password strength hint */}
              {formData.password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-1 w-8 rounded-full transition-colors ${
                          formData.password.length >= level * 3
                            ? level === 1 ? "bg-red-400" : level === 2 ? "bg-yellow-400" : "bg-emerald-400"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 font-light">
                    {formData.password.length < 4 ? "Weak" : formData.password.length < 7 ? "Fair" : "Strong"}
                  </span>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm py-3.5 rounded-xl shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account…
                </>
              ) : (
                "Create free account"
              )}
            </button>
          </form>

          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 font-light">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          <p className="mt-8 text-center text-xs text-gray-300 font-light">
            By creating an account you agree to our{" "}
            <a href="#" className="underline hover:text-gray-500 transition-colors">Terms</a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-gray-500 transition-colors">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
