import express from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import ProductRoutes from "../modules/product/product.routes.js"

const router = express.Router();

router.use("/auth",authRoutes);
router.use("/products",ProductRoutes);

export default router;