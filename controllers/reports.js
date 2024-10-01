// reportController.js

const { request, response } = require("express");
const { generateExcelReport } = require("../helpers/generateExcel");

// const Report = require("../models/report");
// const ReportHelper = require("../helpers/reportHelper");

// Controlador para obtener todos los reportes
const getAllReports = async (req = request, res = response) => {
  try {
    // const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los reportes" });
  }
};

// Controlador para crear un nuevo reporte
const createReport = async (req = request, res = response) => {
  try {
    const { startDate, endDate } = req.body;

    // console.log(req.body);
    // const report = new Report({ title, description });
    // await report.save();

    const data = {
      ...req.body,
    };
    // console.log(data);

    const report = await generateExcelReport(data);

    res.set(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.set("Content-Disposition", "attachment; filename=reporte.xlsx");

    // Enviar el archivo Excel al frontend
    return res.send(report);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el reporte" });
  }
};

const createReportEntity = async (req = request, res = response) => {
  try {
    const data = {
      ...req.body,
    };
    // console.log(data);

    const report = await generateExcelReport(data);

    res.set(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.set("Content-Disposition", "attachment; filename=reporte.xlsx");

    // Enviar el archivo Excel al frontend
    return res.send(report);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el reporte" });
  }
};

module.exports = {
  getAllReports,
  createReport,
  createReportEntity
};
