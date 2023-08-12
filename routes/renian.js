const { Router } = require("express");

const { getRecord } = require("../controllers/renian");

const router = Router();

router.get("/search", getRecord);

module.exports = router;
