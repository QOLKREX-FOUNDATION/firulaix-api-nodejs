const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields } = require("../middlewares");
const { getRaces, createRace, updateRace, deleteRace, getRacesByType, getRacesByTypeSearch } = require("../controllers/races");

const router = Router();

router.get("/", [], getRaces);

router.get("/type", [], getRacesByType);

router.get("/type-search", [], getRacesByTypeSearch);

router.post("/",
    [
        validateJWT,
        check("animal", "The animal is required").not().isEmpty(),
        check("name", "The name is required").not().isEmpty(),
        check("nameSpanish", "The name spanish is required").not().isEmpty(),
        check("nameEnglish", "The name english is required").not().isEmpty(),
        validateFields
    ],
    createRace);

router.put("/:id",
    [
        validateJWT,
        validateFields
    ],
    updateRace);

router.delete("/:id",
    [
        validateJWT,
        validateFields
    ],
    deleteRace);

module.exports = router;