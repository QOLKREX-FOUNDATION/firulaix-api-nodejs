const { Router } = require("express");
const { requestRegisterEntity } = require("../controllers/request");

const router = Router();
router.post("/register-entity", requestRegisterEntity);
module.exports = router;