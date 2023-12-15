const { Router } = require("express");
const { getStatistics, getStatisticsByAddress } = require("../controllers/statistic");

const router = Router();

router.get("/list", getStatistics);

// router.get("/list-stadistic-user/:address", getStatisticsByAddress);

router.post("/list-stadistic-user", getStatisticsByAddress);

module.exports = router;
