const shopify = require("../shopify/shopify");

exports.createDiscount = async (req, res) => {
  try {
    const discountData = {
      price_rule: {
        title: req.body.name,
        value_type: "percentage",
        value: `-${req.body.getY.discountValue}`,
        target_type: "line_item",
        target_selection: "all",
        allocation_method: "across",
        starts_at: new Date(req.body.startDate).toISOString(),
        ends_at: new Date(req.body.endDate).toISOString(),
        customer_selection: "all", 
      },
    };

    const priceRule = await shopify.priceRule.create(discountData.price_rule);
    res.status(201).json(priceRule);
  } catch (error) {
    console.error(
      "Shopify API Error:",
      error.response ? error.response.body : error
    );
    res.status(500).json({
      error: error.response ? error.response.body : error.message,
    });
  }
};

exports.getDiscounts = async (req, res) => {
  try {
    const discounts = await shopify.priceRule.list();
    res.status(200).json(discounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controller code to update discount

exports.updateDiscount = async (req, res) => {
  try {
    const { name, getY, startDate, endDate, perCustomerLimit } = req.body;

    if (!getY || getY.discountValue === undefined || !getY.discountType) {
      return res.status(400).json({ error: "discountValue and discountType are required" });
    }

    // Ensure the discount ID is passed in the URL params
    const discountId = req.params.id;
    if (!discountId) {
      return res.status(400).json({ error: "Discount ID is required" });
    }

    // Prepare discount data for updating in Shopify
    const discountData = {
      title: name,
      value_type: getY.discountType,
      value: getY.discountType === "percentage" ? `-${getY.discountValue}` : `-${getY.discountValue}`,
      target_type: "line_item",
      target_selection: "all",
      allocation_method: "across",
      once_per_customer: perCustomerLimit > 0,
      starts_at: new Date(startDate).toISOString(),
      ends_at: new Date(endDate).toISOString(),
    };

    // Update the discount in Shopify using the price rule ID
    const updatedPriceRule = await shopify.priceRule.update(discountId, discountData);

    res.status(200).json(updatedPriceRule);
  } catch (error) {
    console.error("Error updating discount:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};


exports.deleteDiscount = async (req, res) => {
  try {
    await shopify.priceRule.delete(req.params.id);
    res.status(200).json({ message: "Discount deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
