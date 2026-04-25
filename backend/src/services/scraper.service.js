// Puppeteer launches a browser internally.

// Launch Browser
// → Open Page
// → Visit URL
// → Extract HTML Data
// → Close Browser
import puppeteer from "puppeteer";

// MAIN FUNCTION
export const scrapeProduct = async (url) => {
  const lowerUrl = url.toLowerCase();

  // Detect website
  if (lowerUrl.includes("flipkart")) {
    return await scrapeFlipkart(url);
  }

  if (lowerUrl.includes("amazon")) {
    return await scrapeAmazon(url);
  }

  throw new Error("Unsupported website");
};

// =========================
// FLIPKART SCRAPER
// =========================

const scrapeFlipkart = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();

    // Fake browser identity
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36",
    );

    // Open product page
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    // Small delay
    // await page.waitForTimeout(2000);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Wait for product title
    await page.waitForSelector("h1", {
      timeout: 10000,
    });

    // Extract product data
    // const product = await page.evaluate(() => {
    //   // Product title
    //   const title = document.querySelector("h1")?.innerText?.trim();

    //   // Product price
    //   const priceText =
    //     document.querySelector("div.Nx9bqj")?.innerText ||
    //     document.querySelector("div._30jeq3")?.innerText;

    //   // Product image
    //   const image =
    //     document.querySelector("img._53J4C-")?.src ||
    //     document.querySelector("img")?.src;

    //   return {
    //     title,
    //     priceText,
    //     image,
    //   };
    // });

    // const product = await page.evaluate(() => {
    //   // Title
    //   const title =
    //     document.querySelector("span.VU-ZEz")?.innerText ||
    //     document.querySelector("h1")?.innerText;

    //   // Find price dynamically
    //   const allDivs = Array.from(document.querySelectorAll("div"));

    //   const priceElement = allDivs.find((el) => el.innerText.includes("₹"));

    //   const priceText = priceElement?.innerText;

    //   // Image
    //   const image =
    //     document.querySelector("img._53J4C-")?.src ||
    //     document.querySelector("img")?.src;

    //   return {
    //     title,
    //     priceText,
    //     image,
    //   };
    // });

    const product = await page.evaluate(() => {
      // TITLE
      const title =
        document.querySelector("span.VU-ZEz")?.innerText ||
        document.querySelector("h1")?.innerText;

      // FIND PRICE
      const allDivs = Array.from(document.querySelectorAll("div"));

      const priceElement = allDivs.find((el) => {
        const text = el.innerText?.trim();

        return text && text.startsWith("₹") && text.length < 20;
      });

      const priceText = priceElement?.innerText;

      // IMAGE
     const image =
       document.querySelector("img.Xz2QEH")?.src ||
       document.querySelector("img._53J4C-")?.src ||
       document.querySelector("img.DByuf4")?.src ||
       Array.from(document.querySelectorAll("img")).find((img) =>
         img.src.includes("rukminim"),
       )?.src;

      return {
        title,
        priceText,
        image,
      };
    });

    
    // Validate scraped data
    if (!product.title || !product.priceText) {
      throw new Error("Failed to extract product data");
    }

    // Clean price
    const cleanedPrice = Number(product.priceText.replace(/[^0-9]/g, ""));

    return {
      title: product.title,
      currentPrice: cleanedPrice,
      image: product.image,
      site: "flipkart",
      url,
    };
  } catch (error) {
    console.log("FLIPKART SCRAPER ERROR:", error);

    throw new Error("Flipkart scraping failed");
  } finally {
    await browser.close();
  }
};
// =========================
// AMAZON SCRAPER
// =========================

const scrapeAmazon = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();

    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    await page.waitForSelector("#productTitle");

    const product = await page.evaluate(() => {
      const title = document.querySelector("#productTitle")?.innerText;

      const priceText = document.querySelector(".a-price-whole")?.innerText;

      const image = document.querySelector("#landingImage")?.src;

      return {
        title,
        priceText,
        image,
      };
    });

    const cleanedPrice = Number(product.priceText.replace(/[^0-9]/g, ""));

    return {
      title: product.title,
      currentPrice: cleanedPrice,
      
      image: product.image,
      site: "amazon",
      url,
    };
    
  } catch (error) {
    console.log(error);

    throw new Error("Amazon scraping failed");
  } finally {
    await browser.close();
  }
};



// User sends product URL
//         ↓
// POST /products/add
//         ↓
// Controller receives request
//         ↓
// Product Service calls Scraper
//         ↓
// Scraper extracts product details
//         ↓
// Service saves product in MongoDB
//         ↓
// Response returned