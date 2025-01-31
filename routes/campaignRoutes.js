const express = require("express");
const router = express.Router();
const {
  createDiscount,
  getDiscounts,
  updateDiscount,
  deleteDiscount,
} = require("../controllers/campaignController");


// Define routes for discount operations
router.post("/create", createDiscount); // Create discount
router.get("/list", getDiscounts); // Get all discounts
router.put("/update/:id", updateDiscount); // Update discount (requires ID)
router.delete("/delete/:id", deleteDiscount); // Delete discount (requires ID)

module.exports = router;
