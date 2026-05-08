import puppeteer from "puppeteer";

export const scrapeGeneric = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-blink-features=AutomationControlled"],
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    );
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2000));

    const product = await page.evaluate(() => {
      // Attempt 1: JSON-LD (schema.org Product)
      for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
        try {
          const data = JSON.parse(script.textContent);
          const entries = Array.isArray(data) ? data : [data];
          for (const entry of entries) {
            const item = entry["@type"] === "Product"
              ? entry
              : entry["@graph"]?.find((n) => n["@type"] === "Product");
            if (!item) continue;
            const offer = Array.isArray(item.offers) ? item.offers[0] : item.offers;
            const price = offer?.price ?? offer?.lowPrice;
            if (item.name && price) {
              return {
                title: item.name,
                priceRaw: String(price),
                image: Array.isArray(item.image) ? item.image[0] : item.image,
              };
            }
          }
        } catch (_) {}
      }

      // Attempt 2: Open Graph / meta tags
      const getMeta = (prop) =>
        document.querySelector(`meta[property="${prop}"]`)?.content ||
        document.querySelector(`meta[name="${prop}"]`)?.content;

      const ogTitle = getMeta("og:title");
      const ogPrice = getMeta("product:price:amount") || getMeta("og:price:amount") || getMeta("twitter:data1");
      if (ogTitle && ogPrice) {
        return { title: ogTitle, priceRaw: ogPrice, image: getMeta("og:image") };
      }

      // Attempt 3: Microdata (itemprop)
      const name =
        document.querySelector('[itemprop="name"]')?.innerText?.trim() ||
        document.querySelector('[itemprop="name"]')?.content?.trim();
      const priceEl = document.querySelector('[itemprop="price"]');
      const microPrice = priceEl?.content?.trim() || priceEl?.innerText?.trim();
      if (name && microPrice) {
        return {
          title: name,
          priceRaw: microPrice,
          image: document.querySelector('[itemprop="image"]')?.src || document.querySelector('[itemprop="image"]')?.content,
        };
      }

      return null;
    });

    if (!product) throw new Error("Could not extract product data — site may not expose structured data");

    const cleanedPrice = Number(product.priceRaw.replace(/[^0-9.]/g, ""));
    if (!cleanedPrice) throw new Error("Price parsed as zero");

    const hostname = new URL(url).hostname.replace("www.", "").split(".")[0];
    return { title: product.title, currentPrice: cleanedPrice, image: product.image || null, site: hostname, url };
  } catch (error) {
    console.error("GENERIC SCRAPER ERROR:", error.message);
    throw new Error(`Generic scraping failed: ${error.message}`);
  } finally {
    await browser.close();
  }
};
