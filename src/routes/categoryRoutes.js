const { Router } = require("express");
const { check } = require("express-validator");
const {
  categoryGet,
  categoryGetOne,
  categoryPost,
  categoryDelete,
} = require("../controllers/categoryController");
const { validateExistEmail } = require("../helpers/db_validation");
const { passwordValidator } = require("../middlewears/passwordValidation");
const { tokenVerification } = require("../middlewears/tokenVerification");
const { generalResult } = require("../middlewears/validationResult");

const categoryRouter = Router();

categoryRouter.get("/", /* [tokenVerification, generalResult], */ categoryGet);

categoryRouter.get(
  "/:name",
  [
    /* tokenVerification, */
    check("name", "The name have to be fill").not().isEmpty(),
    generalResult,
  ],
  categoryGetOne
);

categoryRouter.post(
  "/",
  [
    tokenVerification,
    check("name", "The name have to be fill").not().isEmpty(),
    generalResult,
  ],
  categoryPost
);

categoryRouter.delete(
  "/:name",
  [
    tokenVerification,
    check("name", "The name have to be fill").not().isEmpty(),
    generalResult,
  ],
  categoryDelete
);

module.exports = { categoryRouter };
