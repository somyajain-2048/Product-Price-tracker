import express from "express";

import { addProduct, deleteProduct, getProducts, getProductById, refreshProductPrice, toggleFavorite, compareProduct, searchProducts } from "./product.controller.js";

import authMiddleware from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addProduct);
router.post("/compare", authMiddleware, compareProduct);
router.get("/", authMiddleware, getProducts);
router.get("/search", authMiddleware, searchProducts);
router.get("/:id", authMiddleware, getProductById);
router.post("/:id/refresh", authMiddleware, refreshProductPrice);
router.delete("/:id", authMiddleware, deleteProduct);
router.patch("/:id/favorite", authMiddleware, toggleFavorite);

export default router;