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

export const scrapeFlipkart = async (url) => {
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
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2000));

    try {
      await page.click("button._2KpZ6l", { timeout: 3000 });
    } catch (_) {}

    try {
      await page.waitForSelector("span.VU-ZEz, span.B_NuCI, h1, div.Nx9bqj", { timeout: 10000 });
    } catch (_) {}

    const product = await page.evaluate(() => {
      const title =
        document.querySelector("span.VU-ZEz")?.innerText?.trim() ||
        document.querySelector("span.B_NuCI")?.innerText?.trim() ||
        document.querySelector("h1.yhB1nd")?.innerText?.trim() ||
        document.querySelector("h1")?.innerText?.trim() ||
        document.querySelector('meta[property="og:title"]')?.content?.trim();

      const priceRaw =
        document.querySelector("div.Nx9bqj")?.innerText?.trim() ||
        document.querySelector("div._30jeq3")?.innerText?.trim() ||
        document.querySelector("div._16Jk6d")?.innerText?.trim() ||
        (() => {
          const el = Array.from(document.querySelectorAll("div, span")).find((n) => {
            const text = n.children.length === 0 && n.innerText?.trim();
            return text && /^₹\s*[\d,]+$/.test(text);
          });
          return el?.innerText?.trim();
        })() ||
        (() => {
          const bodyText = document.body.innerText || "";
          const match = bodyText.match(/₹\s*([\d,]+)/);
          return match ? match[0] : null;
        })();

      const image =
        document.querySelector("img.Xz2QEH")?.src ||
        document.querySelector("img._53J4C-")?.src ||
        document.querySelector("img.DByuf4")?.src ||
        document.querySelector("img._2r_T1I")?.src ||
        Array.from(document.querySelectorAll("img")).find((img) =>
          img.src?.includes("rukminim")
        )?.src ||
        document.querySelector('meta[property="og:image"]')?.content ||
        null;

      return { title, priceRaw, image };
    });

    if (!product.title) {
      throw new Error("Could not extract title from Flipkart page");
    }

    if (!product.priceRaw) {
      throw new Error("Could not extract price from Flipkart page");
    }

    const priceMatch = product.priceRaw.match(/[\d,]+/);
    const cleanedPrice = priceMatch
      ? Number(priceMatch[0].replace(/,/g, ""))
      : 0;

    if (!cleanedPrice || isNaN(cleanedPrice)) {
      throw new Error("Flipkart price parsed as zero or invalid");
    }

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

    const url = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await new Promise((r) => setTimeout(r, 2000));

    try {
      await page.click("button._2KpZ6l", { timeout: 3000 });
    } catch (_) {}

    const result = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll("a[href*='/p/']"));

      for (const link of links) {
        let container = link;
        while (container.parentElement && container.parentElement.tagName !== "BODY") {
          if (container.parentElement.querySelectorAll("a[href*='/p/']").length > 1) break;
          container = container.parentElement;
        }

        const allText = container.innerText || "";
        const priceMatch = allText.match(/₹\s*([\d,]+)/);
        if (!priceMatch) continue;

        let title = container.querySelector("img[alt]")?.alt || link.title;
        if (!title) {
          const lines = allText.split("\n").map((l) => l.trim()).filter(Boolean);
          title = lines.find(
            (l) =>
              l.length > 5 &&
              !l.toLowerCase().includes("add to compare") &&
              !l.includes("₹") &&
              !l.toLowerCase().includes("ratings") &&
              !l.toLowerCase().includes("off")
          );
        }

        const image =
          container.querySelector("img")?.src ||
          Array.from(container.querySelectorAll("img")).find((i) => i.src?.includes("rukminim"))?.src ||
          null;

        const cleanedPrice = Number(priceMatch[1].replace(/,/g, ""));

        if (title && cleanedPrice) {
          return {
            title,
            currentPrice: cleanedPrice,
            image,
            site: "flipkart",
            url: link.href,
          };
        }
      }

      return null;
    });

    if (!result) {
      console.warn(`Flipkart search found no matching items for: "${query}"`);
      return null;
    }

    return result;
  } catch (error) {
    console.error("SEARCH FLIPKART ERROR:", error.message);
    return null;
  } finally {
    await browser.close();
  }
};

