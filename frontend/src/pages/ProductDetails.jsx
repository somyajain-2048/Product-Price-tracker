import { useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PriceChart from "../components/PriceChart";
import api from "../api/axios";
import { analyzePriceTrend, predictBestTimeToBuy } from "../utils/priceIntelligence";
import CompetitorDeal from "../components/CompetitorDeal";

/* ── Top nav ─────────────────────────────────────────────── */
function TopNav({ onBack }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 h-14 flex items-center px-4 sm:px-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 font-light transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Dashboard
      </button>

      <Link to="/dashboard" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <span className="font-display text-base font-normal bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          PriceTrack
        </span>
      </Link>
    </header>
  );
}

/* ── Toast ───────────────────────────────────────────────── */
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-sm font-light ${
      type === "error" ? "bg-red-600 text-white" : "bg-gray-900 text-white"
    }`}>
      {type === "error" ? (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
      {message}
    </div>
  );
}

/* ── Site badge ──────────────────────────────────────────── */
function SiteBadge({ site }) {
  const cfg =
    site === "amazon"
      ? "bg-orange-50 text-orange-700 border-orange-200"
      : "bg-blue-50 text-blue-700 border-blue-200";
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest border ${cfg}`}>
      {site}
    </span>
  );
}

/* ── Main page ───────────────────────────────────────────── */
export default function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(location.state?.product || null);
  const [isFavorite, setIsFavorite] = useState(location.state?.product?.isFavorite || false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [toast, setToast] = useState(null);
  const [fetchingFresh, setFetchingFresh] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  useEffect(() => {
    if (!id) { navigate("/dashboard"); return; }
    const fetchFresh = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        setIsFavorite(res.data.isFavorite);
      } catch {
        if (!product) navigate("/dashboard");
      } finally {
        setFetchingFresh(false);
      }
    };
    fetchFresh();
  }, [id]);

  const handleRefreshPrice = async () => {
    setRefreshing(true);
    try {
      const res = await api.post(`/products/${id}/refresh`);
      setProduct(res.data);
      setIsFavorite(res.data.isFavorite);
      showToast("Price refreshed successfully!");
    } catch {
      showToast("Failed to refresh price. Try again.", "error");
    } finally {
      setRefreshing(false);
    }
  };

  if (!product && fetchingFresh) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) return null;

  const trend = analyzePriceTrend(product.priceHistory, product.currentPrice, product.lowestPrice);
  const prediction = predictBestTimeToBuy(product.priceHistory, product.currentPrice, product.lowestPrice);

  const priceDrop = product.currentPrice - product.lowestPrice;
  const dropPct = product.lowestPrice
    ? Math.round(((product.currentPrice - product.lowestPrice) / product.currentPrice) * 100)
    : 0;

  const toggleFavorite = async () => {
    try {
      await api.patch(`/products/${product._id}/favorite`);
      setIsFavorite((v) => !v);
    } catch {
      showToast("Failed to update favourite", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/products/${product._id}`);
      navigate("/dashboard");
    } catch {
      showToast("Delete failed", "error");
      setDeleteConfirm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav onBack={() => navigate("/dashboard")} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-5">

        {/* ── Product hero card ──────────────────────────────── */}
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
            {/* Badges */}
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

            {/* Title */}
            <h1 className="font-display text-xl md:text-2xl font-light text-gray-900 leading-snug mb-6">
              {product.title}
            </h1>

            {/* Price grid */}
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

            {/* Actions */}
            <div className="mt-auto pt-5 border-t border-gray-100 flex flex-wrap items-center gap-2.5">
              {/* Refresh price */}
              <button
                onClick={handleRefreshPrice}
                disabled={refreshing}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-light border bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100 transition-all disabled:opacity-50"
              >
                <svg className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {refreshing ? "Refreshing…" : "Refresh Price"}
              </button>

              {/* Favourite */}
              <button
                onClick={toggleFavorite}
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

              {/* View on store */}
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

              {/* Delete */}
              {!deleteConfirm ? (
                <button
                  onClick={() => setDeleteConfirm(true)}
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
                  <button
                    onClick={handleDelete}
                    className="text-xs font-medium text-red-600 hover:text-red-800 transition-colors"
                  >
                    Yes
                  </button>
                  <span className="text-red-300">·</span>
                  <button
                    onClick={() => setDeleteConfirm(false)}
                    className="text-xs font-light text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    No
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Price history card ─────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1">Historical data</p>
              <h2 className="font-display text-xl font-light text-gray-900">Price History</h2>
            </div>
            {product.priceHistory?.length > 0 && (
              <span className="text-xs text-gray-400 font-light">
                {product.priceHistory.length} data points
              </span>
            )}
          </div>

          {product.priceHistory?.length > 0 ? (
            <PriceChart
              history={product.priceHistory}
              currentPrice={product.currentPrice}
              lowestPrice={product.lowestPrice}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <p className="text-sm text-gray-400 font-light">Price history will appear here once tracking begins.</p>
            </div>
          )}
        </div>

        {/* ── Competitor prices card ─────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="mb-6">
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1">Compare across stores</p>
            <h2 className="font-display text-xl font-light text-gray-900">Competitor Prices</h2>
          </div>
          <CompetitorDeal product={product} />
        </div>

      </main>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
