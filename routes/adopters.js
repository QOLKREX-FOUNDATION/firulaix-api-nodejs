const { Router } = require("express");
const { validateJWT } = require("../middlewares/validateJWT");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields"); 
const { isDate } = require("../helpers/isDate");
const { updateRecord, saveRecord, getRecord, deleteRecord } = require("../controllers/adopters");

const router = Router();
/**
 * Middleware all routes
 */
router.use(validateJWT);


router.get('/',  getRecord);

router.post('/',
saveRecord);

router.put('/:id',   updateRecord);

router.delete('/:id',  deleteRecord);

module.exports = router;