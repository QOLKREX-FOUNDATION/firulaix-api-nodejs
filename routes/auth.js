const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

const { getRecord, createRecord, login } = require("../controllers/auth");


router.get("/", getRecord);

router.post(
	"/",
	[
		check("publicAddress", "publicAddress is obliged").not().isEmpty(),
		check("signature", "is obliged").not().isEmpty(),
		validateFields,
	],
	login
);

router.post(
	"/new",
	[
		validateJWT,
		check("publicAddress", "publicAddress is obliged").not().isEmpty(),
		check("rol", "is obliged").not().isEmpty(),
		validateFields,
	],
	createRecord
);

module.exports = router;
