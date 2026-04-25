import express from "express";
import dotenv from "dotenv";
import cors  from "cors";
import routes from "./routes/index.js";
import authMiddleware from "./middleware/auth.middleware.js";
import { scrapeProduct } from "./services/scraper.service.js";

dotenv.config();
const app= express();

app.use(cors());
app.use(express.json());


app.get("/health",(req,res)=>{
    res.status(200).json({
        status:"ok",
        message:"server is running"
    })
})
app.use("/api",routes);
app.get("/api/protected",authMiddleware,(req,res)=>{
    res.json({
        message:"prtected route accesses",
        user:req.user
    })
});

app.get("/test-scraper", async (req, res) => {
  try {
    const url = req.query.url;

    const data = await scrapeProduct(url);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


export default app;