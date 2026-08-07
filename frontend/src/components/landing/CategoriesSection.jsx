import { Link } from "react-router-dom";
import { CATEGORIES } from "../../constants/landing";

const ACCENT_BARS = [
  { bar: "bg-rose-500", btn: "bg-rose-500 hover:bg-rose-600 shadow-rose-100", iconColor: "text-rose-500 bg-rose-50 border-rose-100" },
  { bar: "bg-sky-500", btn: "bg-sky-500 hover:bg-sky-600 shadow-sky-100", iconColor: "text-sky-500 bg-sky-50 border-sky-100" },
  { bar: "bg-amber-500", btn: "bg-amber-500 hover:bg-amber-600 shadow-amber-100", iconColor: "text-amber-600 bg-amber-50 border-amber-100" },
  { bar: "bg-emerald-500", btn: "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100", iconColor: "text-emerald-500 bg-emerald-50 border-emerald-100" },
  { bar: "bg-violet-500", btn: "bg-violet-500 hover:bg-violet-600 shadow-violet-100", iconColor: "text-violet-500 bg-violet-50 border-violet-100" },
  { bar: "bg-indigo-600", btn: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100", iconColor: "text-indigo-600 bg-indigo-50 border-indigo-100" },
];

function CategoryCard({ cat, index }) {
  const accent = ACCENT_BARS[index % ACCENT_BARS.length];
  const numStr = String(index + 1).padStart(2, "0");

  return (
    <div className="relative bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center text-center shadow-xs hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      {/* Top accent indicator */}
      <div className={`absolute top-0 right-6 w-10 h-1 rounded-b-md ${accent.bar}`} />

      {/* Watermark number */}
      <span className="absolute top-3 left-4 font-display text-4xl font-light text-gray-100 group-hover:text-gray-200 transition-colors select-none pointer-events-none">
        {numStr}
      </span>

      {/* Centered icon */}
      <div className={`relative z-10 w-12 h-12 rounded-xl border flex items-center justify-center mb-3.5 shadow-2xs group-hover:scale-105 transition-transform duration-300 ${accent.iconColor}`}>
        {cat.icon}
      </div>

      {/* Centered title */}
      <h3 className="relative z-10 text-base font-bold text-gray-900 mb-1">
        {cat.name}
      </h3>

      {/* Centered body text */}
      <p className="relative z-10 text-xs text-gray-400 font-light leading-relaxed mb-3 max-w-xs">
        {cat.desc}
      </p>

      {/* Popular item pill badge */}
      <div className="relative z-10 inline-flex items-center gap-1.5 text-[11px] text-gray-600 bg-gray-50 border border-gray-100 px-2.5 py-0.5 rounded-full font-medium mb-4">
        <span className="font-medium text-gray-700">{cat.example}</span>
        <span className="text-emerald-600 font-semibold">{cat.drop}</span>
      </div>

      {/* Centered CTA button */}
      <Link
        to="/dashboard"
        className={`relative z-10 w-full py-2.5 px-4 rounded-xl font-medium text-xs text-white ${accent.btn} shadow-xs transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-sm mt-auto`}
      >
        Read More
        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
}

export default function CategoriesSection() {
  return (
    <section id="categories" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block text-[10px] font-medium text-violet-600 bg-violet-50 border border-violet-100 rounded-full px-4 py-1.5 uppercase tracking-[0.2em] mb-3">
            Categories
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-gray-900 tracking-tight mb-3">
            Track products across{" "}
            <span className="italic bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              every category
            </span>
          </h2>
          <p className="text-sm text-gray-400 max-w-lg mx-auto font-light leading-relaxed">
            From electronics to books — we cover thousands of products across every major category.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {CATEGORIES.map((cat, index) => (
            <CategoryCard key={cat.name} cat={cat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}


