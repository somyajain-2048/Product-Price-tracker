import express from "express";

import { addProduct,deleteProduct,getProducts, toggleFavorite } from "./product.controller.js";

import authMiddleware from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add",authMiddleware,addProduct);
router.get("/",authMiddleware,getProducts);
router.delete("/:id",authMiddleware,deleteProduct);
router.patch("/:id/favorite",authMiddleware,toggleFavorite);

export default router;