import { useState } from "react";
import api from "../api/axios";

export default function AddProductForm({ fetchProducts }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success"|"error", message }

  const addProduct = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setStatus(null);
    try {
      await api.post("/products/add", { url });
      setUrl("");
      setStatus({ type: "success", message: "Product added and tracking started!" });
      await fetchProducts();
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.response?.data?.message || "Couldn't add product. Check the URL and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Track a new product</p>
      <form onSubmit={addProduct} className="flex gap-3">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => { setUrl(e.target.value); setStatus(null); }}
            placeholder="Paste an Amazon or Flipkart product URL…"
            className="w-full pl-10 pr-4 py-3 text-sm text-gray-700 font-light bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 placeholder:text-gray-300 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="flex-shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm px-6 py-3 rounded-xl shadow-md shadow-indigo-200 transition-all"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Adding…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Track
            </>
          )}
        </button>
      </form>

      {status && (
        <div className={`mt-3 flex items-center gap-2.5 text-sm font-light px-4 py-2.5 rounded-xl ${
          status.type === "success"
            ? "bg-emerald-50 border border-emerald-100 text-emerald-700"
            : "bg-red-50 border border-red-100 text-red-600"
        }`}>
          {status.type === "success" ? (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {status.message}
        </div>
      )}
    </div>
  );
}
