// content.js runs on the frontend web app (localhost:5173)
// Its job is to grab the token from localStorage and send it to the extension's storage.

function syncToken() {
  const token = localStorage.getItem("token");
  if (token) {
    // Save to extension storage
    chrome.storage.local.set({ authToken: token }, () => {
      console.log("Product Tracker: Auth token synced to extension.");
    });
  } else {
    // If user logs out, clear it
    chrome.storage.local.remove("authToken");
  }
}

// Run immediately
syncToken();

// Also listen for storage events in case they log in/out while the tab is open
window.addEventListener("storage", (event) => {
  if (event.key === "token") {
    syncToken();
  }
});
