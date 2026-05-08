// import Product from "./product.model.js";
// import { scrapeProduct } from "../../services/scrapers/index.js";

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
import { scrapeProduct } from "../../services/scrapers/index.js";

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
// GET SINGLE PRODUCT
// ==========================

export const getProductByIdService = async (productId, userId) => {
  const product = await Product.findOne({ _id: productId, userId });
  if (!product) throw new Error("Product not found");
  return product;
};

// ==========================
// REFRESH PRODUCT PRICE
// ==========================

export const refreshProductPriceService = async (productId, userId) => {
  const product = await Product.findOne({ _id: productId, userId });
  if (!product) throw new Error("Product not found");

  const scrapedData = await scrapeProduct(product.url);
  const newPrice = scrapedData.currentPrice;

  product.currentPrice = newPrice;
  if (!product.lowestPrice || newPrice < product.lowestPrice) {
    product.lowestPrice = newPrice;
  }
  product.priceHistory.push({ price: newPrice, date: new Date() });
  await product.save();

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

// ==========================
// SEARCH PRODUCTS PAGINATED
// ==========================

export const searchProductsService = async (userId, search, site, sortBy, page, limit) => {
  const query = { userId };
  
  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }
  
  if (site && site !== 'all') {
    query.site = site;
  }
  
  let sortOption = {};
  if (sortBy === 'price-asc') sortOption = { currentPrice: 1 };
  else if (sortBy === 'price-desc') sortOption = { currentPrice: -1 };
  else sortOption = { createdAt: -1 }; // default to recent
  
  const skip = (page - 1) * limit;
  
  const products = await Product.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);
    
  const totalProducts = await Product.countDocuments(query);
  const totalPages = Math.ceil(totalProducts / limit);
  
  return {
    products,
    pagination: {
      totalProducts,
      totalPages,
      currentPage: page,
      limit
    }
  };
};