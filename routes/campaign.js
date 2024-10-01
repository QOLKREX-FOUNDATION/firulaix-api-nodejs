const { Router } = require("express");
const {
  getAllDonators,
  getDonatorsByCampaign,
  getTotalAmountByCampaign,
} = require("../controllers/campaign");

const router = Router();

router.get("/", getAllDonators);

// Get all donators by campaign
router.get("/:campaign", getDonatorsByCampaign);

// Get Total amount by campaign
router.get("/total/:campaign", getTotalAmountByCampaign);

module.exports = router;
