const { Router } = require("express");
const { validateJWT, validateFields, validateJWTCorrelative } = require("../middlewares");
const {
  createForm,
  createQr,
  getForms,
  deleteForm,
  updateForm,
  updateFormWithCorrelative,
  getFormsByCorrelative,
  getFormsByCorrelativeNumber,
  getFormsByAdress
} = require("../controllers/forms");
const { check } = require("express-validator");

const router = Router();

// router.get("/", [], getForms);

router.post(
  "/generate-qr",
  [validateJWT, check("url", "The url is required"), validateFields],
  createQr
);

router.get("/", [validateJWT, validateFields], getForms);

router.get("/correlative/:correlative", [], getFormsByCorrelative);

router.get("/address/:address", [], getFormsByAdress);

router.get(
  "/search/:correlative",
  [validateJWT, validateFields],
  getFormsByCorrelativeNumber
);

router.post(
  "/",
  [
    check("country", "The country is required"),
    check("person", "The person is required"),
    check("documentType", "The documentType is required"),
    check("documentNumber", "The documentNumber is required"),
    check("adopterType", "The adopterType is required"),
    check("isAddressPublic", "The isAddressPublic is required"),
    check("addressPublic", "The addressPublic is required"),
    // check("dni", "The dni is required"),
    check("firstName", "The firstName is required"),
    check("secondName", "The secondName is required"),
    check("firstLastName", "The firstLastName is required"),
    check("secondLastName", "The secondLastName is required"),
    check("birthDate", "The birthDate is required"),
    check("gender", "The gender is required"),
    check("cellphone", "The cellphone is required"),
    check("email", "The email is required"),
    check("department", "The department is required"),
    check("province", "The province is required"),
    check("district", "The district is required"),
    check("address", "The address is required"),
    check("regiterEntity", "The regiterEntity is required"),
    check("jurament", "The jurament is required"),
    check("microchip", "The microchip is required"),
    check("dateMicrochip", "The dateMicrochip is required"),
    check("firstNamePet", "The firstNamePet is required"),
    check("countryPet", "The countryPet is required"),
    check("birthDatePet", "The birthDatePet is required"),
    check("adoptionDate", "The adoptionDate is required"),
    check("genderPet", "The genderPet is required"),
    check("specie", "The specie is required"),
    check("race", "The race is required"),
    check("color", "The color is required"),
    check("isSterilized", "The isSterilized is required"),
    check("fatherMicrochip", "The fatherMicrochip is required"),
    check("motherMicrochip", "The motherMicrochip is required"),
    validateFields,
  ],
  createForm
);

router.delete(
  "/:id",
  [validateJWT, check("id", "The id is required"), validateFields],
  deleteForm
);

// router.post(
//   "/pdf/:id",
//   [check("id", "The id is required"), validateFields],
//   createPdfForm
// );

router.put("/:id", [validateJWT], updateForm);

router.put("/correlative/:id", [validateJWTCorrelative], updateFormWithCorrelative);

module.exports = router;
