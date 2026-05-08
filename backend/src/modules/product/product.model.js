import mongoose from "mongoose";

const priceHistorySchema = new mongoose.Schema({
  price: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    currentPrice: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    site: {
      type: String,
      required: true,
    },

    priceHistory: [priceHistorySchema],

    lowestPrice: {
      type: Number,
      default: 0,
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
