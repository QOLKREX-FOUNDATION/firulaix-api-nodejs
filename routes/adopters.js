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
} = require("../controllers/adopters");
const { validateUppercase } = require("../middlewares/validateUppercase");

const router = Router();

router.get("/public", getPublic);

/**
 * Middleware all routes
 */
router.use(validateJWT);

router.get("/", getRecord);
router.get("/email/", getEmail);
router.get("/address/", getAddress);

router.post("/", validateUppercase, saveRecord);

router.put("/:id", validateUppercase, updateRecord);

router.delete("/:id", deleteRecord);

module.exports = router;
