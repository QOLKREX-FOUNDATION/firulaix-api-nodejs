const { response } = require("express");
const { objectUppercase } = require("../helpers/uppercase");

const validateUppercase = (req, res = response, next) => {
    req.body = objectUppercase(req.body);
    next();
};

module.exports = {
    validateUppercase
}