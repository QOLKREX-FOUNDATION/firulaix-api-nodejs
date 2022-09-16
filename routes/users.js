const { Router } = require("express");
const { validateJWT } = require("../middlewares/validateJWT");

const {
	login,
	getRecord,
	passwordUpdate,
	resetSendEmail,
	comprobeToken,
	passwordReset,
	updateData,
} = require("../controllers/users");

const router = Router();

router.post("/login", login);
router.post("/resetSendEmail/", resetSendEmail);

router.get("/", [validateJWT], getRecord);
router.get("/comprobeToken", [validateJWT], comprobeToken);
router.post("/passwordUpdate/", [validateJWT], passwordUpdate);
router.post("/passwordReset/", [validateJWT], passwordReset);
router.post("/updateData/", [validateJWT], updateData);

module.exports = router;
