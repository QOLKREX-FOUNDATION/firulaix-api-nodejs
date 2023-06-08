const { Router } = require("express");
const { requestRegisterEntity, requestRegisterUser } = require("../controllers/request");

const router = Router();
router.post("/register-entity", requestRegisterEntity);

router.post("/register-user", requestRegisterUser);
module.exports = router;