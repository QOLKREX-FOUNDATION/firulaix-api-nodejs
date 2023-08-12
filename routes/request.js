const { Router } = require("express");
const {
	requestRegisterEntity,
	requestRegisterUser,
	requestRegisterUserRenian,
} = require("../controllers/request");

const router = Router();
router.post("/register-entity", requestRegisterEntity);

router.post("/register-user", requestRegisterUser);
router.post("/register-user-renian", requestRegisterUserRenian);
module.exports = router;
