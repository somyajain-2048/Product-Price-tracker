import cron from "node-cron";
import Product from "../modules/product/product.model.js";
import User from "../modules/auth/auth.model.js";
import { scrapeProduct } from "../services/scraper.service.js";
import { sendPriceDropEmail } from "../services/notifications/email.service.js";

const startPriceChecker = () => {
  // Runs every 2 hours
  cron.schedule("0 */2 * * *", async () => {
    console.log(`[${new Date().toISOString()}] Price checker started`);

    try {
      const products = await Product.find();
      console.log(`[PriceCheck] Checking ${products.length} products...`);

      for (const product of products) {
        try {
          // Small delay between each product to avoid bot detection
          await new Promise((r) => setTimeout(r, 3000));

          const scrapedData = await scrapeProduct(product.url);
          const oldPrice = product.currentPrice;
          const newPrice = scrapedData.currentPrice;

          console.log(`[PriceCheck] "${product.title}" | ₹${oldPrice} → ₹${newPrice}`);

          if (newPrice < oldPrice) {
            console.log(`[PriceCheck] Price dropped — sending alert...`);

            const user = await User.findById(product.userId);

            if (user?.email) {
              await sendPriceDropEmail({
                to: user.email,
                userName: user.name,
                productTitle: product.title,
                oldPrice,
                newPrice,
                productUrl: product.url,
                productImage: product.image,
              });
            }
          }

          product.currentPrice = newPrice;

          if (!product.lowestPrice || newPrice < product.lowestPrice) {
            product.lowestPrice = newPrice;
          }

          product.priceHistory.push({ price: newPrice });

          await product.save();
        } catch (err) {
          console.error(`[PriceCheck] Failed for "${product.title}":`, err.message);
        }
      }

      console.log(`[PriceCheck] Done.`);
    } catch (err) {
      console.error("[PriceCheck] Fatal cron error:", err.message);
    }
  });

  console.log("[PriceCheck] Cron scheduled — runs every 2 hours");
};

export default startPriceChecker;
