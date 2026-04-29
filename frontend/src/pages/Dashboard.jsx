import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import AddProductForm from "../components/AddProductForm";
import { analyzePriceTrend, predictBestTimeToBuy } from "../utils/priceIntelligence";

/* ── Toast ──────────────────────────────────────────────── */
function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium transition-all ${
      toast.type === "success" ? "bg-emerald-600 text-white" : "bg-red-500 text-white"
    }`}>
      {toast.type === "success" ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      {toast.message}
    </div>
  );
}

/* ── Stat card ──────────────────────────────────────────── */
function StatCard({ icon, label, value, sub, accent }) {
  const accents = {
    indigo: "from-indigo-50 to-indigo-100/60 border-indigo-100 text-indigo-600",
    violet: "from-violet-50 to-violet-100/60 border-violet-100 text-violet-600",
    emerald: "from-emerald-50 to-emerald-100/60 border-emerald-100 text-emerald-600",
    amber: "from-amber-50 to-amber-100/60 border-amber-100 text-amber-600",
  };
  return (
    <div className={`bg-gradient-to-br ${accents[accent]} border rounded-2xl p-5 flex items-start gap-4`}>
      <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center text-xl shadow-sm flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-semibold text-gray-900 leading-none">{value}</p>
        <p className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wider">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

/* ── Product card ───────────────────────────────────────── */
function ProductCard({ product, onNavigate, onFavorite, onDelete, compact }) {
  const trend = analyzePriceTrend(product.priceHistory, product.currentPrice, product.lowestPrice);
  const prediction = predictBestTimeToBuy(product.priceHistory, product.currentPrice, product.lowestPrice);
  const isLowestEver = product.currentPrice <= product.lowestPrice;
  const [confirmDelete, setConfirmDelete] = useState(false);

  const siteBadgeStyle = product.site?.toLowerCase() === "amazon"
    ? "text-orange-600 bg-orange-50 border border-orange-100"
    : "text-blue-600 bg-blue-50 border border-blue-100";

  if (compact) {
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
            <span className={`text-[9px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded ${siteBadgeStyle}`}>
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
          className={`p-1.5 rounded-lg flex-shrink-0 transition-all ${
            product.isFavorite ? "text-red-500 bg-red-50" : "text-gray-300 hover:text-red-400"
          }`}
        >
          <svg className="w-4 h-4" fill={product.isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    );
  }

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
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-white border border-gray-100 rounded-xl shadow-sm px-2 py-1"
          >
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
          <span className={`text-[10px] font-medium uppercase tracking-widest px-2 py-1 rounded-lg ${siteBadgeStyle}`}>
            {product.site}
          </span>
          {trend && (
            <span className={`text-[10px] font-medium px-2 py-1 rounded-lg ${trend.color}`}>{trend.label}</span>
          )}
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

/* ── Skeleton ───────────────────────────────────────────── */
function CardSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm animate-pulse">
          <div className="h-44 bg-gray-100" />
          <div className="p-4 space-y-2.5">
            <div className="h-3 bg-gray-100 rounded-full w-1/3" />
            <div className="h-3.5 bg-gray-100 rounded-full w-full" />
            <div className="h-3.5 bg-gray-100 rounded-full w-3/4" />
            <div className="h-px bg-gray-50 my-3" />
            <div className="flex justify-between">
              <div className="h-5 bg-gray-100 rounded-full w-1/4" />
              <div className="h-4 bg-gray-100 rounded-full w-1/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Empty state ────────────────────────────────────────── */
function EmptyState({ icon = "🔍", title, desc }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4 text-2xl">
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-700 mb-1">{title}</p>
      <p className="text-xs text-gray-400 text-center max-w-xs">{desc}</p>
    </div>
  );
}

/* ── Sidebar ────────────────────────────────────────────── */
const NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    id: "search",
    label: "Search",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
];

function Sidebar({ active, onNav, onLogout, counts, collapsed, onToggle, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <>
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-30 md:hidden transition-opacity" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-100 shadow-sm z-40 flex flex-col transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 ${collapsed ? "md:w-16 w-60" : "w-60"}`}>
      {/* Brand */}
      <div className="h-16 flex items-center px-4 border-b border-gray-100 gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm shadow-indigo-200 flex-shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        {!collapsed && (
          <span className="font-semibold text-base bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent whitespace-nowrap">
            PriceTrack
          </span>
        )}
        <button
          onClick={onToggle}
          className="ml-auto p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {collapsed
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            }
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && (
                <span className="flex-1 text-left">{item.label}</span>
              )}
              {!collapsed && item.id === "wishlist" && counts.wishlist > 0 && (
                <span className="text-[10px] font-semibold bg-red-100 text-red-600 rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                  {counts.wishlist}
                </span>
              )}
              {!collapsed && item.id === "overview" && counts.drops > 0 && (
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-600 rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                  {counts.drops}↓
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t border-gray-100">
        <button
          onClick={onLogout}
          title={collapsed ? "Log out" : undefined}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
    </>
  );
}

/* ── Overview section ───────────────────────────────────── */
function OverviewSection({ products, loading, onFavorite, onDelete, onNavigate, onAddSuccess }) {
  const favoriteCount = products.filter((p) => p.isFavorite).length;
  const dropsCount = products.filter((p) => p.currentPrice <= p.lowestPrice).length;
  const amazonCount = products.filter((p) => p.site?.toLowerCase() === "amazon").length;
  const flipkartCount = products.filter((p) => p.site?.toLowerCase() === "flipkart").length;
  const recentProducts = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
        <p className="text-sm text-gray-400 mt-1">Your price tracking summary at a glance.</p>
      </div>

      {/* Stats grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon="📦" label="Tracking" value={products.length} sub="products total" accent="indigo" />
          <StatCard icon="❤️" label="Wishlist" value={favoriteCount} sub="saved items" accent="violet" />
          <StatCard icon="📉" label="At Lowest" value={dropsCount} sub="price drops" accent="emerald" />
          <StatCard icon="⚡" label="Platforms" value={`${amazonCount}A / ${flipkartCount}F`} sub="Amazon / Flipkart" accent="amber" />
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      )}

      {/* Add product */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Track a New Product</h2>
        <AddProductForm fetchProducts={onAddSuccess} />
      </div>

      {/* Recent products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Recently Added</h2>
          <span className="text-xs text-gray-400">{recentProducts.length} of {products.length}</span>
        </div>
        {loading ? (
          <CardSkeleton count={6} />
        ) : recentProducts.length === 0 ? (
          <EmptyState icon="📦" title="Nothing tracked yet" desc="Paste an Amazon or Flipkart URL above to start tracking prices." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentProducts.map((p) => (
              <ProductCard key={p._id} product={p} onNavigate={onNavigate} onFavorite={onFavorite} onDelete={onDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Wishlist section ───────────────────────────────────── */
function WishlistSection({ products, loading, onFavorite, onDelete, onNavigate }) {
  const wishlist = products.filter((p) => p.isFavorite);
  const lowestInWishlist = wishlist.filter((p) => p.currentPrice <= p.lowestPrice);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Wishlist</h1>
        <p className="text-sm text-gray-400 mt-1">All your saved / favorited products.</p>
      </div>

      {!loading && wishlist.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard icon="❤️" label="Saved Items" value={wishlist.length} sub="in your wishlist" accent="violet" />
          <StatCard icon="🎉" label="At Lowest Price" value={lowestInWishlist.length} sub="great time to buy" accent="emerald" />
        </div>
      )}

      {loading ? (
        <CardSkeleton count={4} />
      ) : wishlist.length === 0 ? (
        <EmptyState
          icon="❤️"
          title="Your wishlist is empty"
          desc="Click the heart icon on any product card to add it to your wishlist."
        />
      ) : (
        <>
          {lowestInWishlist.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                At Lowest Price — Buy Now!
              </h2>
              <div className="space-y-2 mb-6">
                {lowestInWishlist.map((p) => (
                  <ProductCard key={p._id} product={p} onNavigate={onNavigate} onFavorite={onFavorite} onDelete={onDelete} compact />
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">All Wishlist Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {wishlist.map((p) => (
                <ProductCard key={p._id} product={p} onNavigate={onNavigate} onFavorite={onFavorite} onDelete={onDelete} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Search section ─────────────────────────────────────── */
function SearchSection({ onFavorite, onDelete, onNavigate }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSite, setFilterSite] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchSearchResults = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/products/search', {
        params: { search: searchTerm, site: filterSite, sortBy, page, limit: 6 }
      });
      setResults(res.data.products);
      setTotalPages(res.data.pagination.totalPages);
      setTotalProducts(res.data.pagination.totalProducts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filterSite, sortBy, page]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, filterSite, sortBy]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  const handleFavorite = async (e, id) => {
    await onFavorite(e, id);
    setResults(prev => prev.map(p => p._id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  };

  const handleDelete = async (id) => {
    await onDelete(id);
    fetchSearchResults();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Search</h1>
        <p className="text-sm text-gray-400 mt-1">Find and filter across all your tracked products.</p>
      </div>

      {/* Search bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by product name…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full pl-12 pr-4 py-3 text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 placeholder:text-gray-300 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-gray-500"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Platform filter */}
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-xl p-1">
            {["all", "amazon", "flipkart"].map((site) => (
              <button
                key={site}
                onClick={() => setFilterSite(site)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  filterSite === site
                    ? "bg-white shadow-sm text-indigo-700 border border-indigo-100"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {site === "all" ? "All platforms" : site}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-xs text-gray-600 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-indigo-300 cursor-pointer"
          >
            <option value="recent">Most Recent</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div>
        {!loading && (
          <p className="text-xs text-gray-400 mb-4">
            {totalProducts} result{totalProducts !== 1 ? "s" : ""} {searchTerm && `for "${searchTerm}"`}
          </p>
        )}

        {loading ? (
          <CardSkeleton count={6} />
        ) : results.length === 0 ? (
          <EmptyState
            icon="🔍"
            title={searchTerm ? "No matching products" : "No products yet"}
            desc={searchTerm ? `No products match "${searchTerm}". Try a different keyword.` : "Add products to track from the Overview tab."}
          />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((p) => (
                <ProductCard key={p._id} product={p} onNavigate={onNavigate} onFavorite={handleFavorite} onDelete={handleDelete} />
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-8 pb-4">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-sm disabled:opacity-50 disabled:pointer-events-none transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                
                <div className="flex items-center gap-1.5 px-2">
                  <span className="text-sm font-medium text-gray-700">Page {page}</span>
                  <span className="text-sm text-gray-400 font-light">of {totalPages}</span>
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-sm disabled:opacity-50 disabled:pointer-events-none transition-all"
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main Dashboard ─────────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch {
      showToast("Failed to load products.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    const onFocus = () => fetchProducts();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [fetchProducts]);

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      showToast("Product removed from tracking.");
    } catch {
      showToast("Could not delete product.", "error");
    }
  };

  const toggleFavorite = async (e, id) => {
    e.stopPropagation();
    try {
      await api.patch(`/products/${id}/favorite`);
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, isFavorite: !p.isFavorite } : p))
      );
    } catch {
      showToast("Could not update wishlist.", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNavigate = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const counts = {
    wishlist: products.filter((p) => p.isFavorite).length,
    drops: products.filter((p) => p.currentPrice <= p.lowestPrice).length,
  };

  const sidebarWidth = sidebarCollapsed ? "md:ml-16" : "md:ml-60";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        active={activeSection}
        onNav={(section) => {
          setActiveSection(section);
          setMobileMenuOpen(false);
        }}
        onLogout={handleLogout}
        counts={counts}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className={`flex-1 w-full max-w-full ${sidebarWidth} transition-all duration-300 min-h-screen`}>
        {/* Top bar */}
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center px-4 sm:px-6 gap-4">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 capitalize">{activeSection}</p>
            <p className="text-xs text-gray-400">
              {activeSection === "overview" && `${products.length} products tracked`}
              {activeSection === "wishlist" && `${counts.wishlist} saved items`}
              {activeSection === "search" && "Find your products"}
            </p>
          </div>
          <Link to="/" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">
            ← Back to site
          </Link>
        </div>

        {/* Content */}
        <div className="p-6 max-w-6xl">
          {activeSection === "overview" && (
            <OverviewSection
              products={products}
              loading={loading}
              onFavorite={toggleFavorite}
              onDelete={deleteProduct}
              onNavigate={handleNavigate}
              onAddSuccess={fetchProducts}
            />
          )}
          {activeSection === "wishlist" && (
            <WishlistSection
              products={products}
              loading={loading}
              onFavorite={toggleFavorite}
              onDelete={deleteProduct}
              onNavigate={handleNavigate}
            />
          )}
          {activeSection === "search" && (
            <SearchSection
              products={products}
              loading={loading}
              onFavorite={toggleFavorite}
              onDelete={deleteProduct}
              onNavigate={handleNavigate}
            />
          )}
        </div>
      </main>

      <Toast toast={toast} />
    </div>
  );
}
