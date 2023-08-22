const { Router } = require("express");
const { getStatistics } = require("../controllers/statistic");

const router = Router();

router.get("/list", getStatistics);

module.exports = router;
