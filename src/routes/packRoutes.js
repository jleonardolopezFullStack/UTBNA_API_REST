const { Router } = require("express");
const { check } = require("express-validator");
const {
  packGet,
  packGetOne,
  packPost,
  packDelete,
} = require("../controllers/packController");
const { tokenVerification } = require("../middlewears/tokenVerification");
const { generalResult } = require("../middlewears/validationResult");

const packRouter = Router();

packRouter.get("/", packGet);

packRouter.get(
  "/:name",
  [check("name", "The name have to be fill").not().isEmpty(), generalResult],
  packGetOne
);

packRouter.post(
  "/",
  [
    tokenVerification,
    check("name", "The name have to be fill").not().isEmpty(),
    check("category", "The category have to be fill").not().isEmpty(),
    check("background", "The background have to be fill").not().isEmpty(),
    check("products", "The products have to be fill").not().isEmpty(),
    check("price", "The price have to be fill").not().isEmpty(),
    generalResult,
  ],
  packPost
);

packRouter.delete(
  "/:id/:token",
  [
    tokenVerification,
    check("id", "The id have to be fill").not().isEmpty(),
    generalResult,
  ],
  packDelete
);

module.exports = { packRouter };
