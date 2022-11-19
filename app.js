const express = require("express");
const app = express();
const category = require("./routes/category");
const product = require("./routes/products");
const user = require("./routes/users");
const failerResponse = require("./responseBuilder/failerResponse");

app.use(express.json());

app.use("/api/products", product);
app.use("/api/categories", category);
app.use("/api/user", user);
app.use(async (err, req, res, next) => {
  const error = await err;
  console.log(error);
  return res.status(500).json(failerResponse("Internal Server Error"));
});

module.exports = app;
