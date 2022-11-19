const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const { userValidation } = require("../validation/userValidation");
const catchValidationError = require("../middlewares/catchValidationError");

router.post("/new", userValidation, catchValidationError, registerUser);
router.post("/login", userValidation, catchValidationError, loginUser);

module.exports = router;
