const { response, request } = require("express");

const validateFile = (req = request, res = response, next) => {
  // console.log(req.body);
  // console.log(req.files);
  // console.log(Object.keys(req.files).length);
  // console.log(!req.files.file);
  if (req.files === null || req.files === undefined) {
    return res.status(400).json({
      msg: "No files were uploaded.",
      file: req.files,
    });
  }
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({
      msg: "No files were uploaded.",
      file: Object.keys(req.files),
    });
  }
  next();
};

module.exports = {
  validateFile,
};
