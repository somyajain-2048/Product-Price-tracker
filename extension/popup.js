document.addEventListener("DOMContentLoaded", async () => {
  const authWarning = document.getElementById("auth-warning");
  const appContent = document.getElementById("app-content");
  const urlDisplay = document.getElementById("url-display");
  const trackBtn = document.getElementById("track-btn");
  const messageEl = document.getElementById("message");

  let currentUrl = "";
  let authToken = null;

  // 1. Check if we have the auth token in storage
  chrome.storage.local.get(["authToken"], async (result) => {
    if (result.authToken) {
      authToken = result.authToken;
      authWarning.style.display = "none";
      appContent.style.display = "block";

      // 2. Get the current active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab && tab.url) {
        currentUrl = tab.url;
        urlDisplay.textContent = currentUrl;
      } else {
        urlDisplay.textContent = "Could not get page URL.";
        trackBtn.disabled = true;
      }
    } else {
      // Not logged in
      authWarning.style.display = "block";
      appContent.style.display = "none";
    }
  });

  // 3. Handle Track Button Click
  trackBtn.addEventListener("click", async () => {
    if (!currentUrl || !authToken) return;

    trackBtn.disabled = true;
    trackBtn.textContent = "Saving...";
    messageEl.textContent = "";
    messageEl.className = "message";

    try {
      const response = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ url: currentUrl })
      });

      const data = await response.json();

      if (response.ok) {
        messageEl.textContent = "Product added successfully!";
        messageEl.classList.add("success");
        trackBtn.textContent = "Added!";
      } else {
        messageEl.textContent = data.error || "Failed to add product.";
        messageEl.classList.add("error");
        trackBtn.disabled = false;
        trackBtn.textContent = "Try Again";
      }
    } catch (error) {
      messageEl.textContent = "Network error. Is the backend running?";
      messageEl.classList.add("error");
      trackBtn.disabled = false;
      trackBtn.textContent = "Try Again";
    }
  });
});
