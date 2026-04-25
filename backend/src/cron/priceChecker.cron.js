import cron from "node-cron";

import Product from "../modules/product/product.model.js";

import { scrapeProduct } from "../services/scraper.service.js";
import { sendPriceDropEmail } from "../services/notifications/email.service.js";

// ===================================
// PRICE CHECKER CRON
// ===================================

const startPriceChecker = () => {
  // Every 6 hours
  cron.schedule("0 */6 * * * ", async () => {
    console.log("Running price checker...");

    try {
      // Get all tracked products
      const products = await Product.find();

      for (const product of products) {
        try {
          // Scrape latest data
          const scrapedData = await scrapeProduct(product.url);

          const oldPrice = product.currentPrice;

          const newPrice = scrapedData.currentPrice;

          console.log(`${product.title} | Old: ${oldPrice} | New: ${newPrice}`);

          // Update current price
        //   product.currentPrice = newPrice;


        if (newPrice < oldPrice) {
          console.log("PRICE DROPPED!");

          await sendPriceDropEmail({
            to: "somyajain20048@gmail.com",

            productTitle: product.title,

            oldPrice,

            newPrice,

            productUrl: product.url,
          });
        }

        product.currentPrice = newPrice;

          if (!product.lowestPrice || newPrice < product.lowestPrice) {
            product.lowestPrice = newPrice;
          }

          product.priceHistory.push({
            price: newPrice,
          });

          await product.save();
        } catch (error) {
          console.log(`Failed to update ${product.title}`);
        }
      }
    } catch (error) {
      console.log("CRON ERROR:", error);
    }
  });
};

export default startPriceChecker;
