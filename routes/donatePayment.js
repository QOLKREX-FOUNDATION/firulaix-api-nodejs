const { Router } = require("express");
const { createOrder, receiveWebhook, successDonation, rejectDonation } = require("../controllers/donatePayment");
const router = Router();

router.post("/create-order", createOrder);

router.get("/success", successDonation);

router.get("/pending", (req, res) => {
  res.send("pending");
});

router.get("/failure", rejectDonation);

router.post("/webhook", receiveWebhook);

module.exports = router;
