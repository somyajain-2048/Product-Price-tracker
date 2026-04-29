import { Link } from "react-router-dom";
import { CATEGORIES } from "../../constants/landing";

function CategoryCard({ cat }) {
  return (
    <div className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-100/40 hover:-translate-y-1 transition-all duration-300">
      {/* Gradient header */}
      <div className={`bg-gradient-to-br ${cat.color} p-6 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-6 -translate-x-4" />
        <div className="relative flex items-center gap-3">
          <span className="text-3xl">{cat.emoji}</span>
          <div>
            <h3 className="text-lg font-semibold text-white">{cat.name}</h3>
            <p className="text-xs text-white/70 font-light">{cat.count}</p>
          </div>
        </div>
        <span className="relative mt-3 inline-block text-xs font-light text-white/90 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 tracking-wide">
          {cat.badge}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="text-xs text-gray-400 font-light mb-2 tracking-wide">Example tracked product</p>
        <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3">
          <span className="text-sm font-medium text-gray-700">{cat.example}</span>
          <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">{cat.drop}</span>
        </div>
        <Link
          to="/signup"
          className="mt-4 w-full inline-flex items-center justify-center gap-2 text-sm font-medium text-indigo-600 border border-indigo-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 rounded-2xl py-3 transition-all group"
        >
          Track {cat.name}
          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function CategoriesSection() {
  return (
    <section id="categories" className="py-16 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block text-[10px] font-medium text-violet-600 bg-violet-50 border border-violet-100 rounded-full px-4 py-1.5 uppercase tracking-[0.2em] mb-4">
            Categories
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-gray-900 tracking-tight mb-4">
            Track products across{" "}
            <span className="italic bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              every category
            </span>
          </h2>
          <p className="text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            From electronics to books — we cover thousands of products across every major category.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.name} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
