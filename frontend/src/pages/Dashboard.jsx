import { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import Toast from "../components/Toast";
import Sidebar from "../components/dashboard/Sidebar";
import OverviewSection from "../components/dashboard/OverviewSection";
import WishlistSection from "../components/dashboard/WishlistSection";
import SearchSection from "../components/dashboard/SearchSection";

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
      setProducts((prev) => prev.map((p) => (p._id === id ? { ...p, isFavorite: !p.isFavorite } : p)));
    } catch {
      showToast("Could not update wishlist.", "error");
    }
  };

  const handleNavigate = (product) => navigate(`/product/${product._id}`, { state: { product } });
  const handleLogout = () => { localStorage.removeItem("token"); navigate("/login"); };

  const counts = {
    wishlist: products.filter((p) => p.isFavorite).length,
    drops: products.filter((p) => p.currentPrice <= p.lowestPrice).length,
  };

  const sidebarWidth = sidebarCollapsed ? "md:ml-16" : "md:ml-60";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        active={activeSection}
        onNav={(section) => { setActiveSection(section); setMobileMenuOpen(false); }}
        onLogout={handleLogout}
        counts={counts}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className={`flex-1 w-full max-w-full ${sidebarWidth} transition-all duration-300 min-h-screen`}>
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center px-4 sm:px-6 gap-4">
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
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
          <Link to="/" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">← Back to site</Link>
        </div>

        <div className="p-6 max-w-6xl">
          {activeSection === "overview" && (
            <OverviewSection products={products} loading={loading} onFavorite={toggleFavorite} onDelete={deleteProduct} onNavigate={handleNavigate} onAddSuccess={fetchProducts} />
          )}
          {activeSection === "wishlist" && (
            <WishlistSection products={products} loading={loading} onFavorite={toggleFavorite} onDelete={deleteProduct} onNavigate={handleNavigate} />
          )}
          {activeSection === "search" && (
            <SearchSection onFavorite={toggleFavorite} onDelete={deleteProduct} onNavigate={handleNavigate} />
          )}
        </div>
      </main>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
