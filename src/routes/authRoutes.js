const { Router } = require("express");
const { check } = require("express-validator");
const {
  userGet,
  userPost,
  userPut,
  userDelete,
  userGetOne,
} = require("../controllers/authController");
const { validateExistEmail } = require("../helpers/db_validation");
const { passwordValidator } = require("../middlewears/passwordValidation");
const { tokenVerification } = require("../middlewears/tokenVerification");
const { generalResult } = require("../middlewears/validationResult");

const authRouter = Router();

authRouter.get("/", [tokenVerification, generalResult], userGet);

authRouter.get(
  "/:id",
  [
    tokenVerification,
    check("id", "Please send valid ID").isMongoId(),
    generalResult,
  ],
  userGetOne
);

authRouter.post(
  "/",
  [
    check("name", "The name have to be fill").not().isEmpty(),
    check("password", "The password have to be fill").not().isEmpty(),
    check("email", "It is not a right email, try again please").isEmail(),
    check("email", "This email exist already, pleasy try LogIn").custom(
      validateExistEmail
    ),
    generalResult,
  ],
  userPost
);

authRouter.put(
  "/:id",
  [
    tokenVerification,
    check("id", "Please send valid ID").isMongoId(),
    passwordValidator,
    generalResult,
  ],
  userPut
);

authRouter.delete(
  "/:id",
  [
    tokenVerification,
    check("id", "Please send valid ID").isMongoId(),
    passwordValidator,
    generalResult,
  ],
  userDelete
);

module.exports = { authRouter };
