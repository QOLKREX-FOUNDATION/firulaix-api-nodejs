const { Router } = require("express");
const { getQuantityPets, getQuantityEntityRegister } = require("../controllers/quantity");

// endpoints for quantity animals and entity registers
const router = Router();

router.get("/pets", [], getQuantityPets);

router.get("/register-entity", [], getQuantityEntityRegister);

module.exports = router;