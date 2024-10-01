const express = require("express");
const { getAllReports, createReport, createReportEntity } = require("../controllers/reports");
const { validateJWT, validateFields } = require("../middlewares");
const { check } = require("express-validator");
const router = express.Router();

// Ruta para obtener todos los reportes
router.get("/list-reports", [], getAllReports);

// Ruta para crear un nuevo reporte
router.post(
  "/create-report",
  [
    check("startDate", "La fecha de inicio es obligatoria").not().isEmpty(),
    check("endDate", "La fecha de fin es obligatoria").not().isEmpty(),
  ],
  createReport
);
// validateJWT, validateFields

router.post(
  "/create-report-entity",
  [
    check("startDate", "La fecha de inicio es obligatoria").not().isEmpty(),
    check("endDate", "La fecha de fin es obligatoria").not().isEmpty(),
  ],
  createReportEntity
);

module.exports = router;
