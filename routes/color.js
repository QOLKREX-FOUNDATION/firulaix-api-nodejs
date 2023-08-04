const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields } = require("../middlewares");
const {
  getColors,
  createColor,
  updateColor,
  deleteColor,
  insertColors,
  deleteAllColor,
} = require("../controllers/color");

const router = Router();

router.get("/", [], getColors);

router.post(
  "/",
  [
    validateJWT,
    check("name", "The name is required").not().isEmpty(),
    check("nameSpanish", "The name spanish is required").not().isEmpty(),
    check("nameEnglish", "The name english is required").not().isEmpty(),
    validateFields,
  ],
  createColor
);

router.post("/insertColors", [validateJWT, validateFields], insertColors);

router.put("/:id", [validateJWT, validateFields], updateColor);

router.delete("/:id", [], deleteColor);

router.post("/deleteAll", [validateJWT, validateFields], deleteAllColor);

module.exports = router;
