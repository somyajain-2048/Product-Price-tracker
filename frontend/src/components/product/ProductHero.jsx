import SiteBadge from "./SiteBadge";

export default function ProductHero({
  product, isFavorite, refreshing, deleteConfirm,
  trend, prediction, priceDrop, dropPct,
  onRefresh, onFavorite, onDelete, onDeleteConfirm,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row">

      {/* Image panel */}
      <div className="relative md:w-2/5 bg-gray-50 flex items-center justify-center p-10 md:border-r border-gray-100 min-h-[240px]">
        {prediction && (
          <span className={`absolute top-4 left-4 text-[10px] font-medium uppercase tracking-widest px-2.5 py-1 rounded-full border ${prediction.color}`}>
            {prediction.label}
          </span>
        )}
        <img
          src={product.image}
          alt={product.title}
          className="max-h-52 max-w-full object-contain drop-shadow-sm transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Info panel */}
      <div className="md:w-3/5 p-7 sm:p-8 flex flex-col">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <SiteBadge site={product.site} />
          {trend && (
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest border ${trend.color}`}>
              {trend.label}
            </span>
          )}
          {product.currentPrice === product.lowestPrice && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-200">
              Lowest ever
            </span>
          )}
        </div>

        <h1 className="font-display text-xl md:text-2xl font-light text-gray-900 leading-snug mb-6">
          {product.title}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
            <p className="text-[10px] text-indigo-500 font-medium uppercase tracking-widest mb-1.5">Current Price</p>
            <p className="font-display text-2xl font-light text-indigo-700">
              ₹{product.currentPrice?.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
            <p className="text-[10px] text-emerald-600 font-medium uppercase tracking-widest mb-1.5">Lowest Ever</p>
            <p className="font-display text-2xl font-light text-emerald-700">
              ₹{product.lowestPrice?.toLocaleString("en-IN")}
            </p>
            {priceDrop > 0 && (
              <p className="text-[10px] text-emerald-600 font-light mt-1">
                ₹{priceDrop.toLocaleString("en-IN")} ({dropPct}%) above lowest
              </p>
            )}
          </div>
        </div>

        <div className="mt-auto pt-5 border-t border-gray-100 flex flex-wrap items-center gap-2.5">
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-light border bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100 transition-all disabled:opacity-50"
          >
            <svg className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {refreshing ? "Refreshing…" : "Refresh Price"}
          </button>

          <button
            onClick={onFavorite}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-light border transition-all ${
              isFavorite
                ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                : "bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            }`}
          >
            <svg className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {isFavorite ? "Saved" : "Save"}
          </button>

          {product.url && (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-sm shadow-indigo-200 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View on {product.site?.charAt(0).toUpperCase() + product.site?.slice(1)}
            </a>
          )}

          {!deleteConfirm ? (
            <button
              onClick={() => onDeleteConfirm(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-light border bg-red-50 border-red-200 text-red-400 hover:bg-red-100 hover:text-red-600 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              <span className="text-xs text-red-600 font-light">Remove this product?</span>
              <button onClick={onDelete} className="text-xs font-medium text-red-600 hover:text-red-800 transition-colors">Yes</button>
              <span className="text-red-300">·</span>
              <button onClick={() => onDeleteConfirm(false)} className="text-xs font-light text-gray-500 hover:text-gray-700 transition-colors">No</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
