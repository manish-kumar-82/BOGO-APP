const Product = require("../models/product");
const shopify = require("../shopify/shopify");

// Create a Product & Sync with Shopify
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    // Create product in Shopify
    const shopifyProduct = await shopify.product.create({
      title: name,
      body_html: description,
      variants: [{ price, inventory_quantity: stock }],
      product_type: category,
    });

    // Save in MongoDB
    const product = new Product({
      shopifyId: shopifyProduct.id,
      name,
      description,
      price,
      stock,
      category,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Products (from MongoDB)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Product & Shopify
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ error: "Product not found" });

    // Update in Shopify
    await shopify.product.update(product.shopifyId, {
      title: name,
      body_html: description,
      variants: [{ price, inventory_quantity: stock }],
      product_type: category,
    });

    // Update in MongoDB
    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;
    product.category = category;
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Product & Shopify
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Delete from Shopify
    await shopify.product.delete(product.shopifyId);

    // Delete from MongoDB
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
