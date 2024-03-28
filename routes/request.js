const { Router } = require("express");
const {
	requestRegisterEntity,
	requestRegisterUser,
	requestRegisterUserRenian,
	requestRegisterUserWarSRV,
	requestRegisterUserWarWithChip,
} = require("../controllers/request");

const router = Router();
router.post("/register-entity", requestRegisterEntity);

router.post("/register-user", requestRegisterUser);
router.post("/register-user-war-srv", requestRegisterUserWarSRV);
router.post("/register-user-war-chip", requestRegisterUserWarWithChip);
router.post("/register-user-renian", requestRegisterUserRenian);
module.exports = router;
