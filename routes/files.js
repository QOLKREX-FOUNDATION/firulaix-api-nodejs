// routes upload and delte files (cloudinary)
const { Router } = require("express");
const { check } = require("express-validator");
const {
  getFile,
  uploadFile,
  deleteFile,
  uploadFileEr,
  uploadLogo,
  getLogo,
} = require("../controllers/files");
const { validateFile, validateFields, validateJWT } = require("../middlewares");
const router = Router();

router.post(
  "/",
  [
    validateJWT,
    check("folder", "El folder es requerido").not().isEmpty(),
    check("name", "El name es requerido").not().isEmpty(),
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

router.put(
  "/images",
  [
    validateJWT,
    validateFile,
    check("name", "El nombre es requerido").not().isEmpty(),
    check("folder", "El folder es requerido").not().isEmpty(),
    check("address", "La address es requerida").not().isEmpty(),
    validateFields,
  ],
  uploadFileEr
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

router.post("/upload-logo", [validateJWT], uploadLogo);
router.post("/get-logo", [validateJWT], getLogo);

module.exports = router;
