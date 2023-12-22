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
  getHistoryReport,
  getGenealogy,
  reportTest,
  getAll,
  reportAdopter,
} = require("../controllers/pets");

const router = Router();
/**
 * Middleware all routes
 */

router.post("/status", statusRecord);

router.get("/", getRecord);

router.get("/genealogy/:chip", getGenealogy);
// router.get("/all",  getRecords);

router.post("/", [validateJWT], saveRecord);

router.put("/", [validateJWT], updateRecord);

router.post("/upload", [validateJWT, validateFile], upload);

router.delete("/", [validateJWT], deleteRecord);

router.get("/getHistory", [], getHistory);

router.get("/get-history-pagination", [], getHistoryPagination);

router.get("/get-history-report", [], getHistoryReport);

router.get("/getAdopterPets", [validateJWT], getAdopterPets);

router.post("/report-pet", reportTest)

router.post("/report-adopter", reportAdopter)

router.get("/getall", getAll);

module.exports = router;
