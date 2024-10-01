const { Router } = require("express");
const { createOrder, createOrder2, reciveWebhook, getInfoOrder, createOrderWar, createOrder2War, createOrderDonationWar, createDonator } = require("../controllers/payment");

const router = Router();

router.post("/create-order", createOrder);

router.post("/create-order-2", createOrder2);

router.post("/war-create-order", createOrderWar);

router.post("/war-create-order-2", createOrder2War);

router.post("/webhook", reciveWebhook)

router.post("/order", getInfoOrder)

router.post("/war-create-donation-order", createOrderDonationWar);

router.post("/new-donator", createDonator);

router.get("/", (req, res) => {
    res.send("Pagos")
})

module.exports = router;