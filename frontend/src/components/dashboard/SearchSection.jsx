import { useState, useEffect, useCallback } from "react";
import api from "../../api/axios";
import ProductCard from "./ProductCard";
import CardSkeleton from "./CardSkeleton";
import EmptyState from "./EmptyState";

export default function SearchSection({ onFavorite, onDelete, onNavigate }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSite, setFilterSite] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/products/search", {
        params: { search: searchTerm, site: filterSite, sortBy, page, limit: 6 },
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

  useEffect(() => { setPage(1); }, [searchTerm, filterSite, sortBy]);
  useEffect(() => { fetchResults(); }, [fetchResults]);

  const handleFavorite = async (e, id) => {
    await onFavorite(e, id);
    setResults((prev) => prev.map((p) => p._id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  };

  const handleDelete = async (id) => {
    await onDelete(id);
    fetchResults();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Search</h1>
        <p className="text-sm text-gray-400 mt-1">Find and filter across all your tracked products.</p>
      </div>

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
            <button onClick={() => setSearchTerm("")} className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-xl p-1">
            {["all", "amazon", "flipkart"].map((site) => (
              <button
                key={site}
                onClick={() => setFilterSite(site)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  filterSite === site ? "bg-white shadow-sm text-indigo-700 border border-indigo-100" : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {site === "all" ? "All platforms" : site}
              </button>
            ))}
          </div>
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
