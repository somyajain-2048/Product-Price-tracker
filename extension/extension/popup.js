document.addEventListener("DOMContentLoaded", async () => {
  const authWarning = document.getElementById("auth-warning");
  const appContent = document.getElementById("app-content");
  const trackState = document.getElementById("track-state");
  const successState = document.getElementById("success-state");
  const urlDisplay = document.getElementById("url-display");
  const trackBtn = document.getElementById("track-btn");
  const trackBtnText = document.getElementById("track-btn-text");
  const errorBanner = document.getElementById("error-banner");
  const dashboardBtn = document.getElementById("dashboard-btn");
  const trackAnotherBtn = document.getElementById("track-another-btn");
  const envSelect = document.getElementById("env-select");
  const loginLink = document.getElementById("login-link");
  const footerLink = document.getElementById("footer-link");

  let currentUrl = "";
  let currentToken = null;
  let currentEnvConfig = null;

  const showError = (msg) => {
    errorBanner.textContent = msg;
    errorBanner.style.display = "block";
  };

  const hideError = () => {
    errorBanner.style.display = "none";
    errorBanner.textContent = "";
  };

  const setLoading = (loading) => {
    if (loading) {
      trackBtn.disabled = true;
      trackBtnText.textContent = "Adding…";
      trackBtn.querySelector(".spinner")?.remove();
      const spinner = document.createElement("div");
      spinner.className = "spinner";
      trackBtn.insertBefore(spinner, trackBtnText);
    } else {
      trackBtn.disabled = false;
      trackBtnText.textContent = "Track This Product";
      trackBtn.querySelector(".spinner")?.remove();
    }
  };

  const updateUIForEnv = () => {
    getActiveEnvConfig(({ envKey, envConfig, token }) => {
      currentEnvConfig = envConfig;
      currentToken = token;

      if (envSelect) {
        envSelect.value = envKey;
      }
      if (loginLink) {
        loginLink.href = `${envConfig.frontend}/login`;
      }
      if (footerLink) {
        footerLink.href = envConfig.frontend;
      }

      if (!token) {
        authWarning.style.display = "block";
        appContent.style.display = "none";
      } else {
        authWarning.style.display = "none";
        appContent.style.display = "block";
      }
    });
  };

  // 1. Initialize environment & auth
  updateUIForEnv();

  // Environment switcher change
  if (envSelect) {
    envSelect.addEventListener("change", (e) => {
      const selectedEnv = e.target.value;
      chrome.storage.local.get(["tokens"], (result) => {
        const tokens = result.tokens || {};
        const newAuthToken = tokens[selectedEnv] || null;
        chrome.storage.local.set({
          currentEnv: selectedEnv,
          authToken: newAuthToken
        }, () => {
          hideError();
          updateUIForEnv();
        });
      });
    });
  }

  // 2. Get current tab URL
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.url) {
    currentUrl = tab.url;
    urlDisplay.textContent = currentUrl;
  } else {
    urlDisplay.textContent = "Could not get page URL.";
    trackBtn.disabled = true;
  }

  // 3. Track button click
  trackBtn.addEventListener("click", async () => {
    if (!currentUrl || !currentToken || !currentEnvConfig) return;

    hideError();
    setLoading(true);

    try {
      const response = await fetch(`${currentEnvConfig.backend}/api/products/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify({ url: currentUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        trackState.style.display = "none";
        successState.style.display = "block";
      } else {
        setLoading(false);
        showError(data.error || data.message || "Failed to add product. Please try again.");
      }
    } catch {
      setLoading(false);
      showError(`Network error. Make sure backend (${currentEnvConfig.backend}) is running.`);
    }
  });

  // 4. View in Dashboard
  dashboardBtn.addEventListener("click", () => {
    if (currentEnvConfig) {
      chrome.tabs.create({ url: `${currentEnvConfig.frontend}/dashboard` });
    }
  });

  // 5. Track another — reset to initial state
  trackAnotherBtn.addEventListener("click", () => {
    successState.style.display = "none";
    trackState.style.display = "block";
    hideError();
    setLoading(false);
  });
});
