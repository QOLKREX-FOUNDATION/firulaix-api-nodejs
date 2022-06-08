const { Router } = require("express");
const { validateJWT } = require("../middlewares/validateJWT");
const {
	updateRecord,
	saveRecord,
	getRecord,
	deleteRecord,
	statusRecord,
	getHash,
} = require("../controllers/pets");

const router = Router();
/**
 * Middleware all routes
 */

 router.post("/status", statusRecord);


router.use(validateJWT);

router.get("/", getRecord);


router.post("/", saveRecord);

router.put("/:id", updateRecord);

router.delete("/:id", deleteRecord);


module.exports = router;