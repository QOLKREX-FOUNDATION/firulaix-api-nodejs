// routes upload and delte files (cloudinary)
const { Router } = require("express");
const { check } = require("express-validator");
const { getFile, uploadFile, deleteFile } = require("../controllers/files");
const { validateFile, validateFields, validateJWT } = require("../middlewares");
const router = Router();

router.get(
  "/",
  [
    validateJWT,
    check("name", "El nombre es requerido").not().isEmpty(),
    check("chip", "El chip es requerido").not().isEmpty(),
    validateFields,
  ],
  getFile
);

router.put(
  "/",
  [
    validateJWT,
    validateFile,
    check("name", "El nombre es requerido").not().isEmpty(),
    check("chip", "El chip es requerido").not().isEmpty(),
    validateFields,
  ],
  uploadFile
);

router.delete(
  "/",
  [
    validateJWT,
    check("name", "El nombre es requerido").not().isEmpty(),
    check("chip", "El chip es requerido").not().isEmpty(),
    validateFields,
  ],
  deleteFile
);

module.exports = router;
