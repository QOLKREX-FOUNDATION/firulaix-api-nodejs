const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields } = require("../middlewares");
const {
  getAnimals,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  insertAnimals,
  deleteAllAnimal,
  getAnimalsByType,
  getAnimalsByTypeSearch,
  deleteAnimalByType,
} = require("../controllers/animal");

const router = Router();

router.get("/", [], getAnimals);

router.get("/type", [], getAnimalsByType);

router.get("/type-search", [], getAnimalsByTypeSearch);

router.post(
  "/",
  [
    validateJWT,
    check("name", "The name is required").not().isEmpty(),
    check("nameSpanish", "The name spanish is required").not().isEmpty(),
    check("nameEnglish", "The name english is required").not().isEmpty(),
    validateFields,
  ],
  createAnimal
);

router.post("/insertAnimals", [validateJWT, validateFields], insertAnimals);

router.put("/:id", [validateJWT, validateFields], updateAnimal);

router.delete("/:id", [], deleteAnimal);

router.delete("/type/:type", [validateJWT, validateFields], deleteAnimalByType);

router.post("/deleteAll", [validateJWT, validateFields], deleteAllAnimal);

module.exports = router;
