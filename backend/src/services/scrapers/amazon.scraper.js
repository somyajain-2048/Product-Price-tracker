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

export const parseAmazonPrice = (raw) => {
  if (!raw) return 0;
  const cleaned = raw.replace(/[₹$,\s]/g, "");
  const match = cleaned.match(/\d+(?:\.\d+)?/);
  if (!match) return 0;
  return Math.round(parseFloat(match[0]));
};

export const scrapeAmazon = async (url) => {
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
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    });

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2000));

    try {
      await page.waitForSelector("#productTitle, h1#title, #corePriceDisplay_desktop_feature_div", { timeout: 10000 });
    } catch (_) {}

    const product = await page.evaluate(() => {
      const title =
        document.querySelector("#productTitle")?.innerText?.trim() ||
        document.querySelector("#title")?.innerText?.trim() ||
        document.querySelector("h1")?.innerText?.trim() ||
        document.querySelector('meta[property="og:title"]')?.content?.trim();

      const priceRaw =
        document.querySelector(".a-price .a-offscreen")?.innerText?.trim() ||
        document.querySelector(".a-price-whole")?.innerText?.trim() ||
        document.querySelector("#corePriceDisplay_desktop_feature_div .a-price-whole")?.innerText?.trim() ||
        document.querySelector("#corePrice_feature_div .a-price-whole")?.innerText?.trim() ||
        document.querySelector("#priceblock_ourprice")?.innerText?.trim() ||
        document.querySelector("#priceblock_dealprice")?.innerText?.trim() ||
        document.querySelector('span.a-price span[aria-hidden="true"]')?.innerText?.trim();

      const image =
        document.querySelector("#landingImage")?.src ||
        document.querySelector("#imgBlkFront")?.src ||
        document.querySelector("#main-image")?.src ||
        document.querySelector("img.a-dynamic-image")?.src ||
        document.querySelector('meta[property="og:image"]')?.content ||
        null;

      return { title, priceRaw, image };
    });

    if (!product.title) {
      throw new Error("Could not extract product title from Amazon page");
    }

    if (!product.priceRaw) {
      throw new Error("Could not extract product price from Amazon page");
    }

    const cleanedPrice = parseAmazonPrice(product.priceRaw);
    if (!cleanedPrice || isNaN(cleanedPrice)) {
      throw new Error("Amazon price parsed as zero or invalid");
    }

    return {
      title: product.title,
      currentPrice: cleanedPrice,
      image: product.image,
      site: "amazon",
      url,
    };
  } catch (error) {
    console.error("AMAZON SCRAPER ERROR:", error.message);
    throw new Error(`Amazon scraping failed: ${error.message}`);
  } finally {
    await browser.close();
  }
};

export const searchAmazon = async (query) => {
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
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });

    const url = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await new Promise((r) => setTimeout(r, 2000));

    const result = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('div[data-component-type="s-search-result"]'));

      for (const card of cards) {
        const priceEl =
          card.querySelector(".a-price .a-offscreen") ||
          card.querySelector(".a-price-whole") ||
          card.querySelector(".a-price span");
        const priceText = priceEl?.innerText?.trim();
        if (!priceText) continue;

        const cleanedStr = priceText.replace(/[₹$,\s]/g, "");
        const match = cleanedStr.match(/\d+(?:\.\d+)?/);
        if (!match) continue;
        const priceNum = Math.round(parseFloat(match[0]));
        if (!priceNum || isNaN(priceNum)) continue;

        const titleLink =
          card.querySelector("a.a-link-normal.s-line-clamp-3") ||
          card.querySelector("a.a-link-normal.s-line-clamp-2") ||
          card.querySelector("a.a-link-normal.s-line-clamp-4") ||
          card.querySelector("a.a-text-normal") ||
          card.querySelector("h2 a");

        let title = titleLink?.innerText?.trim();
        if (!title || title.length < 3) {
          const headings = Array.from(card.querySelectorAll("h2"))
            .map((h) => h.innerText.trim())
            .filter(Boolean);
          title = headings.find((h) => h.length > 5) || headings[0] || "Amazon Product";
        }

        let href =
          titleLink?.href ||
          card.querySelector("a[href*='/dp/']")?.href ||
          card.querySelector("a.a-link-normal[href*='/dp/']")?.href ||
          card.querySelector("a[href*='/gp/product/']")?.href ||
          null;

        const image = card.querySelector("img.s-image")?.src || null;

        if (title && priceNum && href) {
          return {
            title,
            currentPrice: priceNum,
            image,
            site: "amazon",
            url: href,
          };
        }
      }
      return null;
    });

    if (!result) {
      console.warn(`Amazon search found no matching items for: "${query}"`);
      return null;
    }

    return result;
  } catch (error) {
    console.error("SEARCH AMAZON ERROR:", error.message);
    return null;
  } finally {
    await browser.close();
  }
};

