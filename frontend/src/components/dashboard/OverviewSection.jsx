import AddProductForm from "../AddProductForm";
import StatCard from "./StatCard";
import ProductCard from "./ProductCard";
import CardSkeleton from "./CardSkeleton";
import EmptyState from "./EmptyState";

export default function OverviewSection({ products, loading, onFavorite, onDelete, onNavigate, onAddSuccess }) {
  const favoriteCount = products.filter((p) => p.isFavorite).length;
  const dropsCount = products.filter((p) => p.currentPrice <= p.lowestPrice).length;
  const amazonCount = products.filter((p) => p.site?.toLowerCase() === "amazon").length;
  const flipkartCount = products.filter((p) => p.site?.toLowerCase() === "flipkart").length;
  const recentProducts = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
        <p className="text-sm text-gray-400 mt-1">Your price tracking summary at a glance.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon="📦" label="Tracking" value={products.length} sub="products total" accent="indigo" />
          <StatCard icon="❤️" label="Wishlist" value={favoriteCount} sub="saved items" accent="violet" />
          <StatCard icon="📉" label="At Lowest" value={dropsCount} sub="price drops" accent="emerald" />
          <StatCard icon="⚡" label="Platforms" value={`${amazonCount}A / ${flipkartCount}F`} sub="Amazon / Flipkart" accent="amber" />
        </div>
      )}

      <div>
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Track a New Product</h2>
        <AddProductForm fetchProducts={onAddSuccess} />
      </div>

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
