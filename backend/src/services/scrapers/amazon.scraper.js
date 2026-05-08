import puppeteer from "puppeteer";

export const scrapeAmazon = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForSelector("#productTitle");

    const product = await page.evaluate(() => ({
      title: document.querySelector("#productTitle")?.innerText?.trim(),
      priceText: document.querySelector(".a-price-whole")?.innerText,
      image: document.querySelector("#landingImage")?.src,
    }));

    const cleanedPrice = Number(product.priceText.replace(/[^0-9]/g, ""));
    return { title: product.title, currentPrice: cleanedPrice, image: product.image, site: "amazon", url };
  } catch (error) {
    console.error("AMAZON SCRAPER ERROR:", error.message);
    throw new Error(`Amazon scraping failed: ${error.message}`);
  } finally {
    await browser.close();
  }
};

export const searchAmazon = async (query) => {
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");

    const cleanQuery = query.split("-")[0].substring(0, 50).trim();
    const url = `https://www.amazon.in/s?k=${encodeURIComponent(cleanQuery)}`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2000));

    const result = await page.evaluate(() => {
      const card = document.querySelector('div[data-component-type="s-search-result"]');
      if (!card) return null;
      return {
        title: card.querySelector("h2 a span")?.innerText || "Amazon Product",
        url: card.querySelector("h2 a")?.href || null,
        priceText: card.querySelector(".a-price-whole")?.innerText || null,
        image: card.querySelector(".s-image")?.src || null,
      };
    });

    if (!result?.priceText) throw new Error("Could not find product on Amazon");

    const cleanedPrice = Number(result.priceText.replace(/[^0-9]/g, ""));
    const productUrl = result.url?.startsWith("http")
      ? result.url
      : result.url
        ? `https://www.amazon.in${result.url}`
        : `https://www.amazon.in/s?k=${encodeURIComponent(cleanQuery)}`;

    return { title: result.title, currentPrice: cleanedPrice, image: result.image, site: "amazon", url: productUrl };
  } catch (error) {
    console.error("SEARCH AMAZON ERROR:", error.message);
    return null;
  } finally {
    await browser.close();
  }
};
