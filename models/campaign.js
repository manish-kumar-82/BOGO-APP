const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  name: String,
  buyX: { products: [String], collections: [String], minQty: Number },
  getY: {
    products: [String],
    discountType: String,
    discountValue: Number,
    quantity: Number,
    autoAdd: Boolean,
  },
  active: Boolean,
  startDate: Date,
  endDate: Date,
  usageLimit: Number,
  perCustomerLimit: Number,
  combinationRules: {
    allowProductDiscounts: Boolean,
    allowOrderDiscounts: Boolean,
    allowShippingDiscounts: Boolean,
  },
});

module.exports = mongoose.model("Campaign", campaignSchema);
