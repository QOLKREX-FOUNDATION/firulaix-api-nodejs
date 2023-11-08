const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields } = require("../middlewares");
const {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  deleteAllDocument,
} = require("../controllers/document");

const router = Router();

router.get("/", [], getDocuments);

router.get("/:id", [], getDocument);

// router.get("/type", [], getDocumentsByType);

// router.get("/type-search", [], getDocumentsByTypeSearch);

router.post(
  "/",
  [
    validateJWT,
    check("name", "The name is required").not().isEmpty(),
    check("minDigits", "The minDigits is required").not().isEmpty(),
    check("maxDigits", "The maxDigits is required").not().isEmpty(),
    check("countries", "The countries is required").not().isEmpty(),
    validateFields,
  ],
  createDocument
);

// router.post("/insertDocuments", [validateJWT, validateFields], insertDocuments);

router.put("/:id", [validateJWT, validateFields], updateDocument);

router.delete("/:id", [], deleteDocument);

router.post("/deleteAll", [validateJWT, validateFields], deleteAllDocument);

module.exports = router;
