export const analyzePriceTrend = (priceHistory, currentPrice, lowestPrice) => {
  if (!priceHistory || priceHistory.length < 2) {
    if (currentPrice <= lowestPrice) {
      return { label: "🔥 Lowest Ever", color: "bg-red-100 text-red-700 border border-red-200" };
    }
    return { label: "➖ Stable", color: "bg-gray-100 text-gray-700 border border-gray-200" };
  }

  if (currentPrice <= lowestPrice) {
    return { label: "🔥 Lowest Ever", color: "bg-red-100 text-red-700 border border-red-200" };
  }

  const lastPrice = priceHistory[priceHistory.length - 1].price;
  const previousPrice = priceHistory[priceHistory.length - 2].price;

  if (lastPrice < previousPrice) {
    return { label: "⬇ Decreasing", color: "bg-green-100 text-green-700 border border-green-200" };
  } else if (lastPrice > previousPrice) {
    return { label: "⬆ Increasing", color: "bg-orange-100 text-orange-700 border border-orange-200" };
  }

  return { label: "➖ Stable", color: "bg-gray-100 text-gray-700 border border-gray-200" };
};

export const predictBestTimeToBuy = (priceHistory, currentPrice, lowestPrice) => {
  if (!priceHistory || priceHistory.length === 0) return null;

  if (currentPrice <= lowestPrice) {
    return { label: "Buy Now", color: "bg-green-500 text-white shadow-sm" };
  }
  
  // If price is more than 10% higher than the lowest price, tell them to wait.
  if (currentPrice > lowestPrice * 1.1) {
    return { label: "Wait for Drop", color: "bg-amber-500 text-white shadow-sm" };
  }

  return { label: "Fair Price", color: "bg-blue-500 text-white shadow-sm" };
};
