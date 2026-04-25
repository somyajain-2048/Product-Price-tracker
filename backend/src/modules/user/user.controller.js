import mongoose from "mongoose";

const PriceHistorySchema = new mongoose.Schema({
    price:Number,
    date:{
        type:Date,
        default:Date.now(),
    }
});

const ProductSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    title:{
        type:String,
        required:true,
    },

    url:{
        type:String,
        required:true,
    },

    currentPrice:{
        type:Number,
        required:true
    },

    image:{
        type:String,
        default:"",
    },

    site:{
        type:String,
         enum:["amazon","flipkart","myntra","meesho"],
         required:true
    },

    priceHistory:[PriceHistorySchema],

    lowestPrice:{
        type:Number,
        default:0,
    },

},
{timestamps:true}

);

const Product = mongoose.model("Product",ProductSchema);

export default Product;


