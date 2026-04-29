import app from "./app.js";
import mongoose from "mongoose";
import startPriceChecker from "./cron/priceChecker.cron.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    startPriceChecker();
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

startServer();
