import { useState } from 'react';
import api from '../api/axios';

const SITE_COLORS = {
  flipkart: 'bg-blue-50 text-blue-700 border-blue-200',
  amazon:   'bg-orange-50 text-orange-700 border-orange-200',
  myntra:   'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
};

const siteColor = (site) => SITE_COLORS[site] ?? 'bg-gray-50 text-gray-600 border-gray-200';

const getMatchQuality = (t1, t2) => {
  if (!t1 || !t2) return "Similar Match";
  const w1 = t1.toLowerCase().split(/\W+/).filter(w => w.length > 2);
  const w2 = t2.toLowerCase().split(/\W+/).filter(w => w.length > 2);
  if (!w1.length) return "Similar Match";
  const matches = w1.filter(w => w2.includes(w)).length;
  return (matches / w1.length) > 0.4 ? "Exact Match" : "Similar Match";
};

const DealCard = ({ deal, product, cheapestPrice }) => {
  const isCheaper = deal.currentPrice < product.currentPrice;
  const isCheapest = deal.currentPrice === cheapestPrice;
  const diff = Math.abs(product.currentPrice - deal.currentPrice);
  const matchQuality = getMatchQuality(product.title, deal.title);

  return (
    <div className={`rounded-2xl border p-5 relative overflow-hidden ${
      isCheaper ? 'bg-emerald-50 border-emerald-100' : 'bg-gray-50 border-gray-100'
    }`}>
      {isCheapest && isCheaper && (
        <span className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-medium uppercase tracking-widest px-2.5 py-1 rounded-full">
          Best Deal
        </span>
      )}

      <div className="flex flex-col sm:flex-row gap-5 items-start">
        {deal.image && (
          <div className="w-20 h-20 bg-white rounded-xl border border-gray-100 p-2 flex-shrink-0 flex items-center justify-center">
            <img src={deal.image} alt={deal.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full border ${siteColor(deal.site)}`}>
              {deal.site}
            </span>
            <span className={`text-[10px] font-light uppercase tracking-widest px-2 py-0.5 rounded-full border ${
              matchQuality === 'Exact Match'
                ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
                : 'bg-yellow-50 text-yellow-700 border-yellow-200'
            }`}>
              {matchQuality}
            </span>
          </div>

          <p className="text-sm text-gray-700 font-light line-clamp-2 leading-relaxed mb-3">{deal.title}</p>

          <div className="flex flex-wrap items-end gap-3">
            <div>
              <p className="text-[10px] text-gray-400 font-light uppercase tracking-widest mb-0.5">Price on {deal.site}</p>
              <p className={`font-display text-2xl font-light ${isCheaper ? 'text-emerald-700' : 'text-gray-800'}`}>
                ₹{deal.currentPrice?.toLocaleString("en-IN")}
              </p>
            </div>
            {isCheaper ? (
              <span className="mb-1 px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-xl border border-emerald-200">
                Save ₹{diff.toLocaleString("en-IN")}
              </span>
            ) : (
              <span className="mb-1 px-2.5 py-1 bg-indigo-50 text-indigo-600 text-xs font-light rounded-xl border border-indigo-100">
                ₹{diff.toLocaleString("en-IN")} more expensive
              </span>
            )}
          </div>
        </div>

        {deal.url && (
          <a
            href={deal.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isCheaper
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shadow-emerald-200'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Deal
          </a>
        )}
      </div>
    </div>
  );
};

const CompetitorDeal = ({ product }) => {
  const [deals, setDeals] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState(null);

  const fetchCompetitorDeal = async () => {
    setLoading(true);
    setErrorText(null);
    try {
      // Search all platforms and filter out the product's current site
      const res = await api.post('/products/compare', { query: product.title, targetSite: 'all' });

      const raw = Array.isArray(res.data) ? res.data : [res.data];
      const filtered = raw.filter(d => d && d.site !== product.site);

      if (!filtered.length) {
        setDeals([]);
        return;
      }
      // Sort cheapest first
      filtered.sort((a, b) => a.currentPrice - b.currentPrice);
      setDeals(filtered);
    } catch (err) {
      console.error("Comparison error:", err);
      setDeals([]);
      if (err.response?.status !== 404) {
        setErrorText(err.response?.data?.error || "Unable to retrieve competitor deals right now.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-14 gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-100 border-t-indigo-500 animate-spin" />
        <p className="text-sm text-indigo-400 font-light animate-pulse">
          Searching Amazon, Flipkart, Myntra & more for best deals…
        </p>
      </div>
    );
  }

  if (deals !== null && deals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 gap-3 text-center bg-gray-50/70 rounded-2xl border border-gray-150">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-800 mb-1">
            {errorText ? "Could not retrieve competitor prices" : "Product is not found on other websites"}
          </h3>
          <p className="text-xs text-gray-400 font-light max-w-sm">
            {errorText || "We searched competitor platforms (Amazon, Flipkart, Myntra), but could not find a matching product on other websites."}
          </p>
        </div>
        <button
          onClick={fetchCompetitorDeal}
          className="mt-1 inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try searching again
        </button>
      </div>
    );
  }

  if (!deals) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div>
          <p className="text-sm text-gray-700 font-light mb-1">Check if there's a better deal elsewhere.</p>
          <p className="text-xs text-gray-400 font-light">
            We'll compare prices across Amazon, Flipkart, Myntra & more instantly.
          </p>
        </div>
        <button
          onClick={fetchCompetitorDeal}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-sm shadow-indigo-200 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Compare Across Stores
        </button>
      </div>
    );
  }

  const cheapestPrice = Math.min(...deals.map(d => d.currentPrice));

  return (
    <div className="flex flex-col gap-3">
      {deals.map((deal, i) => (
        <DealCard key={i} deal={deal} product={product} cheapestPrice={cheapestPrice} />
      ))}
    </div>
  );
};


export default CompetitorDeal;
