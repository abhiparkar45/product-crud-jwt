const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { categoryValidation } = require("../validation/categoryValidation");
const catchValidationError = require("../middlewares/catchValidationError");

const {
  getCategories,
  postCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/", getCategories);
router.post(
  "/new",
  auth,
  categoryValidation,
  catchValidationError,
  postCategory
);
router.put(
  "/:id",
  auth,
  categoryValidation,
  catchValidationError,
  updateCategory
);
router.delete("/:id", auth, deleteCategory);

module.exports = router;
