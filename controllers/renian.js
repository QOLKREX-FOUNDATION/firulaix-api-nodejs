const { response } = require("express");
const util = require("util");
const { mysqlConexion } = require("../database/mysql");
const Pet = require("../model/Pet");
const { mail } = require("../helpers/mail");

// 991003001934415
// 9910030015595702

const getRecord = async (req, res = response) => {
	let pet = {};
	let vaccines = [];
	let type = "WAR";
	pet = await Pet.findOne({ chip: req.query.id });
	try {
		// if (!!!pet) {
		// 	const query = util.promisify(mysqlConexion.query).bind(mysqlConexion);
		// 	pet = await query(
		// 		`SELECT * FROM usuarios where usuario_cargo = '${req.query.id}' order by usuario_id desc limit 1`
		// 	);

		// 	if (pet?.length > 0) {
		// 		pet = pet[0];
		// 		vaccines = await query(
		// 			`SELECT * FROM vacunas where id_microchip = '${req.query.id}'`
		// 		);
		// 		type = "RENIAN";
		// 	} else {
		// 		res.status(400).json({
		// 			ok: false,
		// 			msg: res.setHeader("pet", pet),
		// 		});
		// 	}
		// } else {
		// 	vaccines = pet.vaccines || [];
		// 	delete pet?.vaccines;
		// }

		// esto lo puse yo
		if (!pet) return res.status(404).json({ ok: false, msg: "No se encontro el microchip" })

		// console.log("pet", pet)
		res.status(200).json({
			ok: true,
			type,
			pet,
			vaccines,
		});
	} catch (error) {
		console.log(error)
		res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

const postDataEmail = async (req, res) => {
	try {

		sendEmail = await mail({
			adopter: req.body.adopter,
			pet: req.body.pet,
		});

		res.status(200).json({
			ok: true,
			msg: "Datos enviados correctamente",
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

module.exports = {
	getRecord,
	postDataEmail,
};
