const { Router } = require("express");
const { createOrder, createOrder2, reciveWebhook, getInfoOrder } = require("../controllers/payment");

const router = Router();

router.post("/create-order", createOrder);

router.post("/create-order-2", createOrder2);

router.post("/webhook", reciveWebhook)

router.post("/order", getInfoOrder)

router.get("/", (req, res) => {
    res.send("Pagos")
})

module.exports = router;