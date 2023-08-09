const { Router } = require("express");
const { validateJWT, validateFile } = require("../middlewares");
const {
  updateRecord,
  saveRecord,
  getRecord,
  // getRecords,
  deleteRecord,
  statusRecord,
  getHistory,
  getAdopterPets,
  upload,
  getHistoryPagination,
} = require("../controllers/pets");

const router = Router();
/**
 * Middleware all routes
 */

router.post("/status", statusRecord);

router.get("/", getRecord);
// router.get("/all",  getRecords);

router.post("/", [validateJWT], saveRecord);
router.put("/", [validateJWT], updateRecord);

router.post("/upload", [validateJWT, validateFile], upload);

router.delete("/", [validateJWT], deleteRecord);

router.get("/getHistory", [], getHistory);

router.get("/get-history-pagination", [], getHistoryPagination);

router.get("/getAdopterPets", [validateJWT], getAdopterPets);

module.exports = router;
