const { Router } = require("express");
const { getEntityRegister } = require("../controllers/entityRegister");

const router = Router();

router.get("/list", getEntityRegister);

module.exports = router;
