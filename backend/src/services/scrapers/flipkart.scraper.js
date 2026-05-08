import puppeteer from "puppeteer";

export const scrapeFlipkart = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
      "--disable-infobars",
      "--window-size=1366,768",
    ],
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
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2500));

    try {
      await page.click("button._2KpZ6l", { timeout: 3000 });
      await new Promise((r) => setTimeout(r, 500));
    } catch (_) {}

    await page.waitForSelector("span.VU-ZEz, span.B_NuCI, h1", { timeout: 10000 });

    const product = await page.evaluate(() => {
      const title =
        document.querySelector("span.VU-ZEz")?.innerText?.trim() ||
        document.querySelector("span.B_NuCI")?.innerText?.trim() ||
        document.querySelector("h1.yhB1nd")?.innerText?.trim() ||
        document.querySelector("h1")?.innerText?.trim();

      const priceRaw =
        document.querySelector("div.Nx9bqj")?.innerText?.trim() ||
        document.querySelector("div._30jeq3")?.innerText?.trim() ||
        document.querySelector("div._16Jk6d")?.innerText?.trim() ||
        (() => {
          const el = Array.from(document.querySelectorAll("div, span")).find((n) => {
            const text = n.children.length === 0 && n.innerText?.trim();
            return text && /^₹[\d,]+$/.test(text);
          });
          return el?.innerText?.trim();
        })();

      const image =
        document.querySelector("img.Xz2QEH")?.src ||
        document.querySelector("img._53J4C-")?.src ||
        document.querySelector("img.DByuf4")?.src ||
        document.querySelector("img._2r_T1I")?.src ||
        Array.from(document.querySelectorAll("img")).find((img) =>
          img.src?.includes("rukminim")
        )?.src;

      return { title, priceRaw, image };
    });

    if (!product.title || !product.priceRaw) {
      throw new Error("Could not extract title or price from Flipkart page");
    }

    const priceMatch = product.priceRaw.match(/₹[\d,]+/);
    const cleanedPrice = priceMatch
      ? Number(priceMatch[0].replace(/[^0-9]/g, ""))
      : Number(product.priceRaw.replace(/[^0-9]/g, ""));

    if (!cleanedPrice) throw new Error("Price parsed as zero — selector may need updating");

    return { title: product.title, currentPrice: cleanedPrice, image: product.image, site: "flipkart", url };
  } catch (error) {
    console.error("FLIPKART SCRAPER ERROR:", error.message);
    throw new Error(`Flipkart scraping failed: ${error.message}`);
  } finally {
    await browser.close();
  }
};

export const searchFlipkart = async (query) => {
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
    const url = `https://www.flipkart.com/search?q=${encodeURIComponent(cleanQuery)}`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2500));

    try {
      await page.click("button._2KpZ6l", { timeout: 3000 });
      await new Promise((r) => setTimeout(r, 500));
    } catch (_) {}

    const result = await page.evaluate(() => {
      const firstLink =
        document.querySelector("a._1fQZEK") ||
        document.querySelector("a.s1Q9rs") ||
        document.querySelector('a[target="_blank"][rel="noopener noreferrer"]');
      if (!firstLink) return null;

      const title =
        document.querySelector("div.KzDlHZ")?.innerText?.trim() ||
        document.querySelector("a.WKTcLC")?.innerText?.trim() ||
        document.querySelector("div._4rR01T")?.innerText?.trim() ||
        firstLink.querySelector("img")?.alt ||
        "Flipkart Product";

      const priceRaw =
        document.querySelector("div.Nx9bqj")?.innerText?.trim() ||
        document.querySelector("div._30jeq3")?.innerText?.trim();
      const priceMatch = priceRaw?.match(/₹[\d,]+/);
      const priceText = priceMatch?.[0] || priceRaw;

      const image =
        document.querySelector("img.DByuf4")?.src ||
        document.querySelector("img._396cs4")?.src ||
        firstLink.querySelector("img")?.src;

      return { title, priceText, url: firstLink.href, image };
    });

    if (!result?.priceText) throw new Error("Could not find product on Flipkart search");

    const priceMatch = result.priceText.match(/₹[\d,]+/);
    const cleanedPrice = priceMatch
      ? Number(priceMatch[0].replace(/[^0-9]/g, ""))
      : Number(result.priceText.replace(/[^0-9]/g, ""));

    const productUrl = result.url?.startsWith("http")
      ? result.url
      : `https://www.flipkart.com/search?q=${encodeURIComponent(cleanQuery)}`;

    return { title: result.title, currentPrice: cleanedPrice, image: result.image, site: "flipkart", url: productUrl };
  } catch (error) {
    console.error("SEARCH FLIPKART ERROR:", error.message);
    return null;
  } finally {
    await browser.close();
  }
};
