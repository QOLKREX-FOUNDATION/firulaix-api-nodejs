const { Router } = require("express");
const { getEntityRegister, getEntityRegisterById, getEntityRegisterByAddress, getInfoByAdddress } = require("../controllers/entityRegister");

const router = Router();

router.get("/list", getEntityRegister);

router.get("/list/:id", getEntityRegisterById);

router.get("/address/:id", getEntityRegisterByAddress);
router.get("/info/:id/", getInfoByAdddress);

module.exports = router;
