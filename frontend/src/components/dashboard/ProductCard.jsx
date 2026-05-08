import { useState } from "react";
import { analyzePriceTrend, predictBestTimeToBuy } from "../../utils/priceIntelligence";

const siteBadgeStyle = (site) =>
  site?.toLowerCase() === "amazon"
    ? "text-orange-600 bg-orange-50 border border-orange-100"
    : "text-blue-600 bg-blue-50 border border-blue-100";

function CompactCard({ product, onNavigate, onFavorite }) {
  const isLowestEver = product.currentPrice <= product.lowestPrice;
  return (
    <div
      onClick={() => onNavigate(product)}
      className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center gap-3 p-3"
    >
      <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
        <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 line-clamp-1">{product.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[9px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded ${siteBadgeStyle(product.site)}`}>
            {product.site}
          </span>
          <span className="text-sm font-semibold text-gray-900">₹{product.currentPrice?.toLocaleString()}</span>
          {isLowestEver && (
            <span className="text-[9px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Lowest!</span>
          )}
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onFavorite(e, product._id); }}
        className={`p-1.5 rounded-lg flex-shrink-0 transition-all ${product.isFavorite ? "text-red-500 bg-red-50" : "text-gray-300 hover:text-red-400"}`}
      >
        <svg className="w-4 h-4" fill={product.isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
  );
}

export default function ProductCard({ product, onNavigate, onFavorite, onDelete, compact }) {
  const trend = analyzePriceTrend(product.priceHistory, product.currentPrice, product.lowestPrice);
  const prediction = predictBestTimeToBuy(product.priceHistory, product.currentPrice, product.lowestPrice);
  const isLowestEver = product.currentPrice <= product.lowestPrice;
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (compact) return <CompactCard product={product} onNavigate={onNavigate} onFavorite={onFavorite} />;

  return (
    <div
      onClick={() => onNavigate(product)}
      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-indigo-100/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      <div className="relative bg-gray-50 h-44 flex items-center justify-center p-4 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={(e) => { e.stopPropagation(); onFavorite(e, product._id); }}
          className={`absolute top-2.5 left-2.5 p-1.5 rounded-xl transition-all ${
            product.isFavorite
              ? "bg-red-50 text-red-500 border border-red-100"
              : "bg-white/80 text-gray-300 border border-gray-100 hover:text-red-400 hover:border-red-100"
          }`}
        >
          <svg className="w-4 h-4" fill={product.isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {!confirmDelete ? (
          <button
            onClick={(e) => { e.stopPropagation(); setConfirmDelete(true); }}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-xl bg-white/80 text-gray-300 border border-gray-100 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        ) : (
          <div onClick={(e) => e.stopPropagation()} className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-white border border-gray-100 rounded-xl shadow-sm px-2 py-1">
            <span className="text-[10px] text-gray-500">Remove?</span>
            <button onClick={(e) => { e.stopPropagation(); onDelete(product._id); }} className="text-[10px] font-medium text-red-600 hover:text-red-800">Yes</button>
            <button onClick={(e) => { e.stopPropagation(); setConfirmDelete(false); }} className="text-[10px] font-medium text-gray-400 hover:text-gray-600">No</button>
          </div>
        )}

        {prediction && (
          <div className={`absolute bottom-2.5 left-2.5 px-2.5 py-1 text-[10px] font-medium rounded-lg ${prediction.color}`}>
            {prediction.label}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2.5">
          <span className={`text-[10px] font-medium uppercase tracking-widest px-2 py-1 rounded-lg ${siteBadgeStyle(product.site)}`}>
            {product.site}
          </span>
          {trend && <span className={`text-[10px] font-medium px-2 py-1 rounded-lg ${trend.color}`}>{trend.label}</span>}
        </div>
        <h2 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug flex-1 mb-3">{product.title}</h2>
        <div className="pt-3 border-t border-gray-50 flex items-end justify-between">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Current</p>
            <p className="text-xl font-light text-gray-900">₹{product.currentPrice?.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Lowest</p>
            {isLowestEver ? (
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">Lowest ever!</span>
            ) : (
              <p className="text-sm font-medium text-emerald-600">₹{product.lowestPrice?.toLocaleString()}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
