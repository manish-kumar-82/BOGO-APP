require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db/conn");
const campaignRoutes = require("./routes/campaignRoutes");
const productRoutes = require("./routes/productRoutes");

const webhookRoutes = require("./shopify/webhooks");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/campaigns", campaignRoutes);
app.use("/api/products", productRoutes);
app.use("/webhooks", webhookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
