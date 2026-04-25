// import Product from "./product.model.js";
// import { scrapeProduct } from "../../services/scraper.service.js";

// export const addProductService = async (userId, data) => {
//   const product = await Product.create({
//     userId,
//     ...data,
//     lowestPrice: data.currentPrice,

//     priceHistory: [
//       {
//         price: data.currentPrice,
//       },
//     ],
//   });

//   return product;
// };

// export const getProductsService = async (userId) => {
//   return await Product.find({ userId });
// };

// export const deleteProductService = async (productId, userId) => {
//   const product = await Product.findOneAndDelete({
//     _id: productId,
//     userId,
//   });

//   if (!product) {
//     throw new Error("Product not found");
//   }

//   return product;
// };

import Product from "./product.model.js";
import { scrapeProduct } from "../../services/scraper.service.js";

// ==========================
// ADD PRODUCT
// ==========================

export const addProductService = async (userId, url) => {
  // Scrape product data
  const scrapedData = await scrapeProduct(url);

  // Save to DB
  const product = await Product.create({
    userId,

    title: scrapedData.title,

    currentPrice: scrapedData.currentPrice,

    image: scrapedData.image,

    site: scrapedData.site,

    url: scrapedData.url,

    lowestPrice: scrapedData.currentPrice,

    priceHistory: [
      {
        price: scrapedData.currentPrice,
      },
    ],
  });

  return product;
};

// ==========================
// GET PRODUCTS
// ==========================

export const getProductsService = async (userId) => {
  return await Product.find({ userId });
};

// ==========================
// DELETE PRODUCT
// ==========================

export const deleteProductService = async (productId, userId) => {
  const product = await Product.findOneAndDelete({
    _id: productId,
    userId,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// ==========================
// TOGGLE FAVORITE
// ==========================

export const toggleFavoriteService = async (productId, userId) => {
  const product = await Product.findOne({ _id: productId, userId });
  
  if (!product) {
    throw new Error("Product not found");
  }

  product.isFavorite = !product.isFavorite;
  await product.save();

  return product;
};