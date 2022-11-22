const { Router } = require("express");
const { validateJWT } = require("../middlewares/validateJWT");
const {
	updateRecord,
	saveRecord,
	getRecord,
	getRecords,
	deleteRecord,
	statusRecord,
	getHistory,
	getAdopterPets,
	upload,
} = require("../controllers/pets");

const router = Router();
/**
 * Middleware all routes
 */

router.post("/status", statusRecord);

router.get("/",  getRecord);
router.get("/all",  getRecords);

router.post("/", [validateJWT], saveRecord);
router.put("/", [validateJWT], updateRecord);

router.post("/upload", [validateJWT], upload);

router.delete("/", [validateJWT], deleteRecord);

router.get("/getHistory", [validateJWT], getHistory);

router.get("/getAdopterPets", [validateJWT], getAdopterPets);

module.exports = router;
