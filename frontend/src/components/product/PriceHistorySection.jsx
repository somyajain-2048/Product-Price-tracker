import PriceChart from "../PriceChart";

export default function PriceHistorySection({ priceHistory, currentPrice, lowestPrice }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1">Historical data</p>
          <h2 className="font-display text-xl font-light text-gray-900">Price History</h2>
        </div>
        {priceHistory?.length > 0 && (
          <span className="text-xs text-gray-400 font-light">{priceHistory.length} data points</span>
        )}
      </div>

      {priceHistory?.length > 0 ? (
        <PriceChart history={priceHistory} currentPrice={currentPrice} lowestPrice={lowestPrice} />
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
  );
}
