import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { analyzePriceTrend, predictBestTimeToBuy } from "../utils/priceIntelligence";
import api from "../api/axios";
import Toast from "../components/Toast";
import TopNav from "../components/product/TopNav";
import ProductHero from "../components/product/ProductHero";
import PriceHistorySection from "../components/product/PriceHistorySection";
import CompetitorDeal from "../components/CompetitorDeal";

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

  const showToast = useCallback((message, type = "success") => setToast({ message, type }), []);

  useEffect(() => {
    if (!id) { navigate("/dashboard"); return; }
    let isMounted = true;

    const fetchFresh = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        if (isMounted) { setProduct(res.data); setIsFavorite(res.data.isFavorite); }
      } catch {
        if (!product && isMounted) navigate("/dashboard");
      } finally {
        if (isMounted) setFetchingFresh(false);
      }
    };
    fetchFresh();

    const intervalId = setInterval(async () => {
      try {
        const res = await api.post(`/products/${id}/refresh`);
        if (isMounted) { setProduct(res.data); setIsFavorite(res.data.isFavorite); }
      } catch (err) {
        console.error("Auto-refresh failed", err);
      }
    }, 60000);

    return () => { isMounted = false; clearInterval(intervalId); };
  }, [id, navigate, product]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav onBack={() => navigate("/dashboard")} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        <ProductHero
          product={product}
          isFavorite={isFavorite}
          refreshing={refreshing}
          deleteConfirm={deleteConfirm}
          trend={trend}
          prediction={prediction}
          priceDrop={priceDrop}
          dropPct={dropPct}
          onRefresh={handleRefreshPrice}
          onFavorite={toggleFavorite}
          onDelete={handleDelete}
          onDeleteConfirm={setDeleteConfirm}
        />

        <PriceHistorySection
          priceHistory={product.priceHistory}
          currentPrice={product.currentPrice}
          lowestPrice={product.lowestPrice}
        />

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="mb-6">
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1">Compare across stores</p>
            <h2 className="font-display text-xl font-light text-gray-900">Competitor Prices</h2>
          </div>
          <CompetitorDeal product={product} />
        </div>
      </main>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
