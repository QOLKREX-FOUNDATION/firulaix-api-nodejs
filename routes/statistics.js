const { Router } = require("express");
const { getStatistics, getStatisticsByAddress, statsPets, statsAdopter } = require("../controllers/statistic");

const router = Router();

router.get("/list", getStatistics);

// router.get("/list-stadistic-user/:address", getStatisticsByAddress);

router.post("/list-stadistic-user", getStatisticsByAddress);

router.post("/stats-pets", statsPets)
router.post("/stats-adopter", statsAdopter)

module.exports = router;
