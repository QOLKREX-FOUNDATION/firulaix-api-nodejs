const { check } = require("express-validator");
const {
  getCode,
  createCode,
  insertCode,
  updateCode,
  deleteCode,
  getCodes,
} = require("../controllers/codePhone");
const { validateJWT, validateFields, validateFile } = require("../middlewares");
const { Router } = require("express");

const router = Router();

router.get("/", [], getCodes);

router.get("/:id", [validateJWT], getCode);

router.post(
  "/",
  [
    validateJWT,
    check("name", "The name is required").not().isEmpty(),
    check("countryCode", "The country code is required").not().isEmpty(),
    check("phoneCode", "The phone code is required").not().isEmpty(),
    // validateFile,
    validateFields,
  ],
  createCode
);

router.post("/insertColors", [validateJWT, validateFields], insertCode);

router.put("/:id", [validateJWT, validateFields], updateCode);

router.delete("/:id", [validateJWT], deleteCode);

// router.post("/deleteAll", [validateJWT, validateFields], deleteAllColor);

module.exports = router;
