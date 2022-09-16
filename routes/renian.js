const { Router } = require("express");
const { validateJWT } = require("../middlewares/validateJWT");

const { getRecord } = require("../controllers/renian");

const router = Router();

router.get("/", [validateJWT], getRecord);

module.exports = router;
