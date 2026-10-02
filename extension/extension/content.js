// content.js runs on the frontend web app (localhost:5173 or Vercel production)
// Its job is to grab the token from localStorage and sync it to the extension's storage.

function syncToken() {
  const token = localStorage.getItem("token");
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const detectedEnv = isLocal ? "local" : "live";

  chrome.storage.local.get(["tokens", "currentEnv"], (result) => {
    const tokens = result.tokens || {};
    if (token) {
      tokens[detectedEnv] = token;
      // Set the active environment and current token to the one currently visited
      chrome.storage.local.set({
        tokens: tokens,
        currentEnv: detectedEnv,
        authToken: token
      }, () => {
        console.log(`Product Tracker: Auth token synced for ${detectedEnv} environment.`);
      });
    } else {
      delete tokens[detectedEnv];
      const updates = { tokens: tokens };
      if (result.currentEnv === detectedEnv) {
        updates.authToken = null;
      }
      chrome.storage.local.set(updates);
    }
  });
}

// Run immediately
syncToken();

// Also listen for storage events in case they log in/out while the tab is open
window.addEventListener("storage", (event) => {
  if (event.key === "token") {
    syncToken();
  }
});
