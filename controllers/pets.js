const { response } = require("express");
const { validateJWT } = require("../middlewares/validateJWT");
const Pet = require("../model/Pet");
const Adopter = require("../model/Adopter");

const getRecords = async (req, res = response) => {
	try {
		let pet = await Pet.find();
		res.json({
			ok: true,
			pet,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

const getRecord = async (req, res = response) => {
	const { chip } = req.query;
	try {
		let pet = await Pet.findOne({
			chip,
		});

		let adopter = await Adopter.findOne({
			address: pet.adopter,
		});

		res.json({
			ok: true,
			pet,
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

const saveRecord = async (req, res = response) => {
	req.body.created_for = req.body.userAddress;
	const pet = new Pet(req.body);
	let msg = "";
	try {
		pet.user = req.uid;

		let find = await Pet.findOne({ chip: req.body.chip });
		if (find) msg = "warOffice.drawers.petsRegistry.modal.chipValidate";

		if (msg) {
			res.status(400).json({
				ok: false,
				msg: msg,
			});
		}

		const record = await pet.save();

		res.status(201).json({
			ok: true,
			data: record,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

const updateRecord = async (req, res = response) => {
	try {
		const find = await Pet.findOne({ chip: req.body.chip });

		if (!find) {
			return res.status(401).json({
				ok: false,
				msg: "No exist pet",
			});
		}

		await Pet.findByIdAndUpdate(
			find._id,
			{
				...req.body,
				update_for: req.body.userAddress,
				update_at: new Date(),
			},
			{ new: true }
		);

		res.status(200).json({
			ok: true,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

const deleteRecord = async (req, res = response) => {
	const find = await Pet.findOne({ chip: req.body.chip });

	if (!find) {
		return res.status(401).json({
			ok: false,
			msg: "No exist pet",
		});
	}

	await Pet.findByIdAndRemove(find._id);

	res.status(200).json({
		ok: true,
	});
};

const statusRecord = async (req, res = response) => {
	try {
		const find = await Pet.findOne({ chip: req.body.chip }).populate(
			"user",
			"publicAddress"
		);

		if (!find) {
			return res.status(401).json({
				ok: false,
				msg: "No exist pet",
			});
		}

		if (find.adopter == req.body.address) {
		} else {
			validateJWT;
		}

		await Pet.findByIdAndUpdate(
			find._id,
			{
				status: req.body.status,
			},
			{ new: true }
		);

		res.status(200).json({
			ok: true,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

const getHistory = async (req, res = response) => {
	let { idRegisteringEntity } = req.query;
	// idRegisteringEntity = JSON.parse(idRegisteringEntity);
	// idRegisteringEntity = idRegisteringEntity?.map((id) => Number(id));

	try {
		let pets = await Pet.find({
			// idRegisteringEntity: { $in: idRegisteringEntity },
			idRegisteringEntity,
		}).sort("create_at");

		let adopters = await Adopter.find({ idRegisteringEntity });

		res.status(201).json({
			ok: true,
			pets,
			adopters,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

const upload = async (req, res = response) => {
	try {
		const { name, chip } = req.body;
		const file = req.files.file;
		file.mv(`./public/images/${name}/${chip}.jpg`, (err) => {
			if (err) return res.status(500).send({ message: err });
			res.status(201).json({
				ok: true,
				message: "File upload",
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

const getAdopterPets = async (req, res = response) => {
	try {
		const adopter = await Adopter.findOne({ email: req.verifyCredential });
		const pets = await Pet.find({ adopter: adopter.address });

		res.status(201).json({
			ok: true,
			pets,
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
	getRecords,
	saveRecord,
	updateRecord,
	deleteRecord,
	statusRecord,
	getHistory,
	getAdopterPets,
	upload,
};
