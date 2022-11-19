const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { productValidation } = require("../validation/productValidation");
const catchValidationError = require("../middlewares/catchValidationError");

const {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.post("/new", auth, productValidation, catchValidationError, postProduct);
router.put(
  "/:id",
  auth,
  productValidation,
  catchValidationError,
  updateProduct
);
router.delete("/:id", auth, deleteProduct);

module.exports = router;
