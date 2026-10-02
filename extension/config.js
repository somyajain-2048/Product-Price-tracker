// Configuration for extension environments
const CONFIG = {
  ENVIRONMENTS: {
    live: {
      name: "Live (Cloud)",
      frontend: "https://product-price-tracker-ten.vercel.app",
      backend: "https://product-price-tracker-qlw8.onrender.com"
    },
    local: {
      name: "Localhost",
      frontend: "http://localhost:5173",
      backend: "http://localhost:5000"
    }
  },
  DEFAULT_ENV: "live"
};

// Helper to retrieve active environment details
function getActiveEnvConfig(callback) {
  chrome.storage.local.get(["currentEnv", "tokens", "authToken"], (result) => {
    const envKey = result.currentEnv && CONFIG.ENVIRONMENTS[result.currentEnv] ? result.currentEnv : CONFIG.DEFAULT_ENV;
    const envConfig = CONFIG.ENVIRONMENTS[envKey];
    const token = (result.tokens && result.tokens[envKey]) || (result.currentEnv === envKey ? result.authToken : null);
    
    callback({
      envKey,
      envConfig,
      token,
      tokens: result.tokens || {}
    });
  });
}
