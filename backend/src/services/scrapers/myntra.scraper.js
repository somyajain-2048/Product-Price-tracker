import puppeteer from "puppeteer";

export const searchMyntra = async (query) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-blink-features=AutomationControlled"],
  });
  try {
    const page = await browser.newPage();
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => false });
      window.chrome = { runtime: {} };
    });
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    );
    await page.setViewport({ width: 1366, height: 768 });

    const cleanQuery = query.split("-")[0].substring(0, 50).trim();
    const url = `https://www.myntra.com/search?rawQuery=${encodeURIComponent(cleanQuery)}`;
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 3000));

    const result = await page.evaluate(() => {
      const card = document.querySelector("li.product-base");
      if (!card) return null;

      const title = (
        (card.querySelector(".product-brand")?.innerText?.trim() || "") +
        " " +
        (card.querySelector(".product-product")?.innerText?.trim() || "")
      ).trim() || card.querySelector(".product-title")?.innerText?.trim();

      const priceRaw =
        card.querySelector(".product-discountedPrice")?.innerText?.trim() ||
        card.querySelector(".product-price span")?.innerText?.trim();

      return {
        title,
        priceRaw,
        url: card.querySelector("a")?.href || null,
        image: card.querySelector("img.img-responsive")?.src || card.querySelector("img")?.src || null,
      };
    });

    if (!result?.priceRaw) throw new Error("Could not find product on Myntra search");

    const priceMatch = result.priceRaw.match(/[\d,]+/);
    const cleanedPrice = priceMatch ? Number(priceMatch[0].replace(/,/g, "")) : 0;
    if (!cleanedPrice) throw new Error("Price parsed as zero");

    const productUrl = result.url?.startsWith("http")
      ? result.url
      : result.url
        ? `https://www.myntra.com${result.url}`
        : `https://www.myntra.com/search?rawQuery=${encodeURIComponent(cleanQuery)}`;

    return { title: result.title || "Myntra Product", currentPrice: cleanedPrice, image: result.image, site: "myntra", url: productUrl };
  } catch (error) {
    console.error("SEARCH MYNTRA ERROR:", error.message);
    return null;
  } finally {
    await browser.close();
  }
};
