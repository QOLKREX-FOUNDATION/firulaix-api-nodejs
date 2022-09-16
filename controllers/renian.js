const { response } = require("express");
const { conexion } = require("../database/mysql");


const getRecord = async (req, res = response) => {
	try {
        conexion.query('SELECT * FROM empleados', function (error, results, fields) {
            if (error)
                throw error;
        
            results.forEach(result => {
                console.log(result);
            });
        });

		res.status(200).json({
			ok: true,
			adopter,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

module.exports = {
	getRecord,
};
