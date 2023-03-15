const validateFields = require("../middlewares/validateFields");
const validateFile = require("../middlewares/validateFile");
const validateJWT = require("../middlewares/validateJWT");
const validateUppercase = require("../middlewares/validateUppercase");

module.exports = {
  ...validateFields,
  ...validateFile,
  ...validateJWT,
  ...validateUppercase,
};
