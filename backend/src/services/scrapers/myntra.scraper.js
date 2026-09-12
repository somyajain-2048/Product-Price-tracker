import puppeteer from "puppeteer";

const PUPPETEER_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-blink-features=AutomationControlled",
  "--disable-infobars",
  "--window-size=1366,768",
];

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

export const searchMyntra = async (query) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: PUPPETEER_ARGS,
  });

  try {
    const page = await browser.newPage();
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => false });
      window.chrome = { runtime: {} };
    });
    await page.setUserAgent(USER_AGENT);
    await page.setViewport({ width: 1366, height: 768 });

    const url = `https://www.myntra.com/search?rawQuery=${encodeURIComponent(query)}`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });

    try {
      await page.waitForSelector("li.product-base", { timeout: 10000 });
    } catch (_) {}

    const result = await page.evaluate(() => {
      const card = document.querySelector("li.product-base");
      if (!card) return null;

      const brand = card.querySelector(".product-brand")?.innerText?.trim() || "";
      const product = card.querySelector(".product-product")?.innerText?.trim() || "";
      const fallbackTitle = card.querySelector(".product-title")?.innerText?.trim() || "";
      const title = (brand ? `${brand} ${product}`.trim() : product) || fallbackTitle || "Myntra Product";

      const priceRaw =
        card.querySelector(".product-discountedPrice")?.innerText?.trim() ||
        card.querySelector(".product-price span")?.innerText?.trim() ||
        card.querySelector(".product-price")?.innerText?.trim();

      if (!priceRaw) return null;

      const priceMatch = priceRaw.match(/[\d,]+/);
      const cleanedPrice = priceMatch ? Number(priceMatch[0].replace(/,/g, "")) : 0;
      if (!cleanedPrice || isNaN(cleanedPrice)) return null;

      const urlEl = card.querySelector("a");
      const relativeUrl = urlEl?.getAttribute("href") || urlEl?.href || null;

      const image =
        card.querySelector("img.img-responsive")?.src ||
        card.querySelector("img")?.src ||
        null;

      return {
        title,
        currentPrice: cleanedPrice,
        image,
        url: relativeUrl,
      };
    });

    if (!result) {
      console.warn(`Myntra search found no matching items for: "${query}"`);
      return null;
    }

    const productUrl = result.url?.startsWith("http")
      ? result.url
      : result.url
        ? `https://www.myntra.com/${result.url.replace(/^\//, "")}`
        : `https://www.myntra.com/search?rawQuery=${encodeURIComponent(query)}`;

    return {
      title: result.title,
      currentPrice: result.currentPrice,
      image: result.image,
      site: "myntra",
      url: productUrl,
    };
  } catch (error) {
    console.error("SEARCH MYNTRA ERROR:", error.message);
    return null;
  } finally {
    await browser.close();
  }
};

