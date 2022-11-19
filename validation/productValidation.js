const { body } = require("express-validator");

exports.productValidation = [
  body("productName")
    .notEmpty()
    .withMessage("Product Name is required !")
    .isLength({ min: 5, max: 50 })
    .withMessage(
      "Product Name should be at least 5 characters or at most 50 characters long !"
    ),
  body("productPrice")
    .notEmpty()
    .withMessage("Product Price is Required !")
    .custom((val) => !isNaN(val))
    .withMessage("Invalid Price !"),
  body("categoryID")
    .notEmpty()
    .withMessage("Category is not provided !")
    .custom((val) => !isNaN(val))
    .withMessage("Invalid value !"),
];
