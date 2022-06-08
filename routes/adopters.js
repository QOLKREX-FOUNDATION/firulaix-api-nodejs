const { Router } = require("express");
const { validateJWT } = require("../middlewares/validateJWT");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { isDate } = require("../helpers/isDate");
const {
	updateRecord,
	saveRecord,
	getRecord,
	deleteRecord,
    getAddress,
    getEmail,
} = require("../controllers/adopters");
const { validateUppercase } = require("../middlewares/validateUppercase");

const router = Router();
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
