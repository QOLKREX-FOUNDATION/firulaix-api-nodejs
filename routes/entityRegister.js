const { Router } = require("express");
const { getEntityRegister, getEntityRegisterById, getEntityRegisterByAddress } = require("../controllers/entityRegister");

const router = Router();

router.get("/list", getEntityRegister);

router.get("/list/:id", getEntityRegisterById);

router.get("/address/:id", getEntityRegisterByAddress);

module.exports = router;
