import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { STATS } from "../../constants/landing";

/* ── Decorative floaters ─────────────────────────────────── */
const PlusMark = ({ className }) => (
  <span className={`absolute text-white/15 text-2xl select-none pointer-events-none ${className}`}>+</span>
);

const Ring = ({ className }) => (
  <span className={`absolute rounded-full border border-white/12 pointer-events-none ${className}`} />
);

const DiscountTag = ({ value, className }) => (
  <div className={`absolute hidden lg:flex items-center gap-1.5 bg-white/12 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 pointer-events-none select-none ${className}`}>
    <div className="w-5 h-5 rounded-full bg-emerald-400/80 flex items-center justify-center">
      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    </div>
    <span className="text-white/90 text-xs font-medium">{value}</span>
  </div>
);

/* ── Left: shopping cart illustration ────────────────────── */
const LeftDecoration = () => (
  <div className="absolute left-2 bottom-24 hidden lg:block pointer-events-none select-none opacity-70">
    <svg width="150" height="160" viewBox="0 0 150 160" fill="none">
      <path d="M15 35 Q18 20 30 20 L120 20 Q132 20 135 35 L145 70" stroke="white" strokeOpacity="0.3" strokeWidth="4" strokeLinecap="round" fill="none" />
      <rect x="15" y="70" width="120" height="65" rx="10" fill="white" fillOpacity="0.1" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
      <circle cx="45" cy="147" r="12" fill="white" fillOpacity="0.12" stroke="white" strokeOpacity="0.25" strokeWidth="2" />
      <circle cx="45" cy="147" r="5" fill="white" fillOpacity="0.2" />
      <circle cx="100" cy="147" r="12" fill="white" fillOpacity="0.12" stroke="white" strokeOpacity="0.25" strokeWidth="2" />
      <circle cx="100" cy="147" r="5" fill="white" fillOpacity="0.2" />
      <rect x="28" y="78" width="35" height="30" rx="5" fill="white" fillOpacity="0.18" />
      <rect x="69" y="82" width="28" height="26" rx="5" fill="white" fillOpacity="0.14" />
      <rect x="102" y="79" width="22" height="29" rx="5" fill="white" fillOpacity="0.12" />
      <line x1="28" y1="93" x2="63" y2="93" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
      <line x1="45" y1="78" x2="45" y2="108" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
    </svg>
  </div>
);

/* ── Right: headphones + watch illustration ──────────────── */
const RightDecoration = () => (
  <div className="absolute right-4 top-28 hidden lg:block pointer-events-none select-none opacity-70">
    <svg width="140" height="130" viewBox="0 0 140 130" fill="none">
      <path d="M20 75 C20 38 43 12 70 12 C97 12 120 38 120 75" stroke="white" strokeOpacity="0.35" strokeWidth="7" strokeLinecap="round" fill="none" />
      <rect x="8" y="65" width="25" height="42" rx="10" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.25" strokeWidth="2" />
      <circle cx="20" cy="86" r="7" fill="white" fillOpacity="0.2" />
      <rect x="107" y="65" width="25" height="42" rx="10" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.25" strokeWidth="2" />
      <circle cx="120" cy="86" r="7" fill="white" fillOpacity="0.2" />
    </svg>
    <div className="mx-auto w-12 -mt-1">
      <div className="relative w-11 h-14 bg-white/10 rounded-xl border border-white/18 mx-auto flex flex-col items-center justify-center gap-1.5 p-2">
        <div className="w-full h-1 bg-white/25 rounded-full" />
        <div className="w-3/4 h-1 bg-white/18 rounded-full" />
        <div className="w-full h-1 bg-white/18 rounded-full" />
        <div className="w-1/2 h-1 bg-emerald-400/45 rounded-full" />
        <div className="absolute -right-1.5 top-4 w-1.5 h-5 bg-white/20 rounded-full" />
      </div>
    </div>
  </div>
);

/* ── Main component ───────────────────────────────────────── */
export default function HeroSection() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(query.trim() ? `/signup?q=${encodeURIComponent(query)}` : "/signup");
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden pt-24 pb-14"
      style={{ background: "linear-gradient(140deg, #1a1754 0%, #2e28a0 35%, #4338ca 65%, #5b21b6 100%)" }}
    >
      {/* Center radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(139,92,246,0.22) 0%, transparent 70%)" }}
      />

      {/* Subtle wave pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        {[0, 80, 160, 240, 320].map((y) => (
          <path key={y} d={`M0 ${y + 200} Q360 ${y + 120} 720 ${y + 200} Q1080 ${y + 280} 1440 ${y + 200}`} stroke="white" strokeWidth="1.5" fill="none" />
        ))}
      </svg>

      {/* Decorative marks */}
      <PlusMark className="top-28 left-[18%]" />
      <PlusMark className="top-52 right-[22%]" />
      <PlusMark className="bottom-44 left-[28%]" />
      <PlusMark className="bottom-36 right-[18%]" />
      <Ring className="w-5 h-5 top-44 left-[35%]" />
      <Ring className="w-4 h-4 bottom-52 right-[30%]" />
      <Ring className="w-6 h-6 top-1/3 left-[12%]" />

      <DiscountTag value="40% off today" className="top-36 left-[7%] -rotate-6" />
      <DiscountTag value="Price dropped" className="bottom-52 right-[5%] rotate-3" />

      <LeftDecoration />
      <RightDecoration />

      {/* ── Center content ─────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 text-white/55 text-sm mb-6 tracking-widest uppercase">
          <span className="text-violet-300 text-xs">✦</span>
          <span className="font-light">Real-time price intelligence</span>
          <span className="text-violet-300 text-xs">✦</span>
        </div>

        {/* Display headline — Fraunces serif */}
        <h1 className="font-display mb-4 tracking-tight">
          {/* italic, light line */}
          <span className="block text-4xl sm:text-5xl lg:text-[4.5rem] leading-[1.08] font-light italic text-white/90">
            The right price
          </span>
          <span className="block text-4xl sm:text-5xl lg:text-[4.5rem] leading-[1.08] font-normal text-white">
            is worth waiting for.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-base text-white/55 leading-relaxed mb-7 max-w-xl mx-auto font-light">
          Paste any Amazon or Flipkart link. We watch the price around the clock
          and send you an alert the moment it drops to where you want it.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="w-full mb-5">
          <div className="flex items-center bg-white rounded-full shadow-2xl shadow-indigo-950/50 overflow-hidden p-1.5 pl-5 ring-2 ring-white/0 focus-within:ring-violet-300/30 transition-shadow">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Paste an Amazon / Flipkart link or search a product…"
              className="flex-1 px-3 py-2.5 text-sm text-gray-600 bg-transparent outline-none placeholder:text-gray-400 font-light"
            />
            <button type="button" className="p-2 text-gray-400 hover:text-indigo-500 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <button
              type="submit"
              className="flex-shrink-0 bg-indigo-700 hover:bg-indigo-800 text-white font-medium px-7 py-3 rounded-full text-sm transition-all"
            >
              Search
            </button>
          </div>
        </form>

        {/* Platform labels */}
        <div className="flex items-center gap-3 justify-center">
          <span className="text-white/35 text-xs font-light uppercase tracking-widest">Works with</span>
          <span className="bg-white/10 border border-white/18 rounded-lg px-3 py-1 text-xs font-medium text-orange-300">amazon</span>
          <span className="bg-white/10 border border-white/18 rounded-lg px-3 py-1 text-xs font-medium text-yellow-300">flipkart</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center bg-white/8 backdrop-blur-sm border border-white/12 rounded-2xl py-4 px-3">
              <p className="font-display text-2xl sm:text-3xl font-light text-white">{stat.value}</p>
              <p className="text-xs text-white/45 mt-1 font-light tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Curve into next section */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="w-full block">
          <path d="M0 56 L0 28 Q360 0 720 28 Q1080 56 1440 28 L1440 56 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
