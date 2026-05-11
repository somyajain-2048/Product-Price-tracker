import app from "./app.js";
import mongoose from "mongoose";
import http from "http";
import startPriceChecker from "./cron/priceChecker.cron.js";
import { initSocket } from "./socket.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const httpServer = http.createServer(app);
    const io = initSocket(httpServer);

    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    startPriceChecker(io);
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

startServer();
