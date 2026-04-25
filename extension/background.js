// 1. Handle Messages from Content Scripts (Inject Button)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "trackProduct") {
    chrome.storage.local.get(["authToken"], async (result) => {
      if (!result.authToken) {
        sendResponse({ success: false, error: "Not logged in" });
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/products/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${result.authToken}`,
          },
          body: JSON.stringify({ url: request.url }),
        });

        if (res.ok) {
          sendResponse({ success: true });
        } else {
          sendResponse({ success: false });
        }
      } catch (error) {
        sendResponse({ success: false, error: error.message });
      }
    });

    return true; // Keep the message channel open for async response
  }
});

// 2. Setup Price Polling Alarm (Runs every 60 minutes)
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("priceCheckAlarm", { periodInMinutes: 60 });
  checkPrices();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "priceCheckAlarm") {
    checkPrices();
  }
});

async function checkPrices() {
  chrome.storage.local.get(["authToken", "cachedProducts"], async (result) => {
    if (!result.authToken) return;

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${result.authToken}`,
        },
      });

      if (!response.ok) return;

      const freshProducts = await response.json();
      const cachedProducts = result.cachedProducts || [];

      const cachedMap = {};
      cachedProducts.forEach(p => {
        cachedMap[p._id] = p.currentPrice;
      });

      freshProducts.forEach(product => {
        const oldPrice = cachedMap[product._id];
        const newPrice = product.currentPrice;

        // If oldPrice exists and newPrice is lower, it's a drop!
        if (oldPrice && newPrice < oldPrice) {
          showNotification(product.title, newPrice, oldPrice);
        }
      });

      // Save the fresh list for next time
      chrome.storage.local.set({ cachedProducts: freshProducts });

    } catch (error) {
      console.log("Price check failed", error);
    }
  });
}

// Minimal base64 icon since extension doesn't have local image files yet
const genericIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

function showNotification(title, newPrice, oldPrice) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: genericIcon,
    title: "🔥 Price Drop Alert!",
    message: `Dropped to ₹${newPrice} (was ₹${oldPrice})\n${title}`,
    priority: 2
  });
}
