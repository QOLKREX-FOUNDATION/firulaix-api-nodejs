const { Router } = require("express");
const { getEntityRegister, getEntityRegisterById } = require("../controllers/entityRegister");

const router = Router();

router.get("/list", getEntityRegister);

router.get("/list/:id", getEntityRegisterById);

module.exports = router;
