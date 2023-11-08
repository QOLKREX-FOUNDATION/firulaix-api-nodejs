const { Router } = require("express");
const { validateJWT } = require("../middlewares/validateJWT");

const {
	updateRecord,
	saveRecord,
	getRecord,
	deleteRecord,
	getAddress,
	getEmail,
	getPublic,
	getRecordAddress,
	getHistory,
	getAdopterByEmailOrName,
} = require("../controllers/adopters");
const { validateUppercase } = require("../middlewares/validateUppercase");

const router = Router();

router.get("/public", getPublic);

// /**
//  * Middleware all routes
//  */
// router.use(validateJWT);

router.get("/", [validateJWT], getRecord);
router.get("/getHistory", [validateJWT], getHistory);
router.get("/getUpdate", [validateJWT], getRecordAddress);
router.get("/email/", [validateJWT], getEmail);
router.get("/address/", [validateJWT], getAddress);

router.post("/", [validateJWT], saveRecord);

router.put("/:id", [validateJWT], updateRecord);

router.delete("/:id", [validateJWT], deleteRecord);

router.get("/search/:search", [validateJWT], getAdopterByEmailOrName);

module.exports = router;
