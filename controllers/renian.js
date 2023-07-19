const { response, request } = require("express");
const util = require("util");
const { mysqlConexion } = require("../database/mysql");
const Pet = require("../model/Pet");
const { mail } = require("../helpers/mail");
const Adopter = require("../model/Adopter");

// 991003001934415
// 9910030015595702

const getRecord = async (req = request, res = response) => {
	// let pet = {};
	let vaccines = [];
	let type = "WAR";
	try {
		const pet = await Pet.findOne({ chip: req.query.id });

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
		// if (!pet) return res.status(404).json({ ok: false, msg: "No se encontro el microchip" })

		if (!pet) {
			const db = mongoose.connection;
			const collectionName = "renian_old";

			const collection = db.collection(collectionName);
			const query = { usuario_cargo: req.query.id };
			const options = {};

			const result = await collection.findOne(query, options);

			const query2 = { id_microchip: req.query.id };
			const vaccines = await collection.find(query2, options).toArray();
			//   if (result) {
			// 	pet = result;
			// 	vaccines = result.vacunas || [];
			// 	delete pet?.vacunas;
			// 	type = "RENIAN";
			//   }

			if (!result) {
				return res.status(400).json({
					ok: false,
					message: "No se encontro el registro",
				});
			}

			return res.status(200).json({
				ok: true,
				type: "RENIAN",
				pet: {
					_id: result._id,
					addressEr: "",
					userAddress: "",
					userName: result.usuario_nombre,
					adopter: "",
					adopterName: result.usuario_nombre,
					adopterLastName: result.usuario_apellidos,
					dateRegistring: result.usuario_registrado,
					name: "DRAGON",
					race: "HALF BLOOD",
					gender: "MALE",
					date: result.usuario_registrado,
					dateAdoption: result.usuario_registrado,
					dateIssue: result.usuario_registrado,
					chip: result.usuario_cargo,
					chipDate: result.usuario_registrado,
					colour: "BROWN",
					image: `https://consultwar.renian.foundation/public/images/petimg/${ result.usuario_foto }`,
					pedigree: "",
					country: "PE",
					type: "DOG",
					sterilized: "NO",
					hash: "",
					status: "",
					idRegisteringEntity: 1,
					created_for: "",
					created_at: result.usuario_registrado,
					vaccines,
					user: result.usuario_id,
					__v: 0,
					update_at:
						"Tue Mar 21 2023 11:08:37 GMT-0500 (hora estándar de Perú)",
					update_for: "0X365665CD4D15887314E608A0E6DB0A9C1C922710",
				},
			});
		}

		const adopter = await Adopter.findOne({ address: pet.adopter });

		// console.log("pet", pet)
		return res.status(200).json({
			ok: true,
			type,
			pet,
			adopter,
			vaccines,
		});
	} catch (error) {
		console.log(error)
		return res.status(500).json({
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
