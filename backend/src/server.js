import app from "./app.js";
import mongoose from "mongoose";
import startPriceChecker from "./cron/priceChecker.cron.js";

const PORT = process.env.PORT || 5000;

const startServer = async()=>{
try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected");
9
    app.listen(PORT,()=>{
        console.log(`server is running on port",${PORT}`)
    });
} catch (error) {
    console.error("db connection failed",error.message);
    process.exit(1);
}
}

startServer();
startPriceChecker();