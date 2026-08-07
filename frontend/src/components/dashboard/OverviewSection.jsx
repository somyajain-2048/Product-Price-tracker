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
          <StatCard
            index={0}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            }
            label="Tracking"
            value={products.length}
            sub="products total"
            accent="indigo"
          />
          <StatCard
            index={1}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            }
            label="Wishlist"
            value={favoriteCount}
            sub="saved items"
            accent="violet"
          />
          <StatCard
            index={2}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            }
            label="At Lowest"
            value={dropsCount}
            sub="price drops"
            accent="emerald"
          />
          <StatCard
            index={3}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
            label="Platforms"
            value={`${amazonCount}A / ${flipkartCount}F`}
            sub="Amazon / Flipkart"
            accent="amber"
          />
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
          <EmptyState
            icon={
              <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            }
            title="Nothing tracked yet"
            desc="Paste an Amazon or Flipkart URL above to start tracking prices."
          />

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
