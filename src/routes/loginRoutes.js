const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/loginController");
const {
  validateNoExistEmail,
  validateAdminRole,
} = require("../helpers/db_validation");
const { passwordValidator } = require("../middlewears/passwordValidation");
const { generalResult } = require("../middlewears/validationResult");

const loginRouter = Router();

loginRouter.post(
  "/",
  [
    check("password", "Please type your password").not().isEmpty(),
    check("email", "Please type your email").not().isEmpty(),
    check("email", "It is not a right email, try again please").isEmail(),
    check("email", "Email doesn't exist, try again").custom(
      validateNoExistEmail
    ),
    check("email", "Have to be Admin for login").custom(validateAdminRole),

    generalResult,
  ],
  login
);

module.exports = { loginRouter };
