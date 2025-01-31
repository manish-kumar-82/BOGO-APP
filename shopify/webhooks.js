const express = require("express");
const router = express.Router();

router.post("/orders", async (req, res) => {
  try {
    console.log("New Order:", req.body);
    res.status(200).send("Webhook received");
  } catch (error) {
    res.status(500).send("Webhook error");
  }
});

module.exports = router;
