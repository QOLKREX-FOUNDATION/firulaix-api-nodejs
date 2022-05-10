const { Router } = require("express");
const { validateJWT } = require("../middlewares/validateJWT");
const { getRecord } = require("../controllers/country");

const router = Router();
/**
 * Middleware all routes
 */
router.use(validateJWT);

router.get("/", getRecord);

module.exports = router;
