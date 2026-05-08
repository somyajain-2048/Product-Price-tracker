import StatCard from "./StatCard";
import ProductCard from "./ProductCard";
import CardSkeleton from "./CardSkeleton";
import EmptyState from "./EmptyState";

export default function WishlistSection({ products, loading, onFavorite, onDelete, onNavigate }) {
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
        <EmptyState icon="❤️" title="Your wishlist is empty" desc="Click the heart icon on any product card to add it to your wishlist." />
      ) : (
        <>
          {lowestInWishlist.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
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
