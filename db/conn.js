const mongoose = require("mongoose");

const connectDB = process.env.MONGO_URL;
mongoose
  .connect(connectDB)
  .then(() => console.log("Connecting db Successfully"))
  .catch((e) => console.log(e));

module.exports = connectDB;
