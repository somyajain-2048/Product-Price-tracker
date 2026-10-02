const { join } = require("path");

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer to be within the backend directory.
  // This ensures Render packages Chrome into the deployment container.
  cacheDirectory: join(__dirname, "backend", ".cache", "puppeteer"),
};
