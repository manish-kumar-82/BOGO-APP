const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  shopifyId: { type: String, required: true, unique: true }, // Store Shopify Product ID
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  stock: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
