const { response } = require("express");
const { validateJWT } = require("../middlewares/validateJWT");
const Pet = require("../model/Pet");
const User = require("../model/User");

const getRecord = async (req, res = response) => {
	const { chip } = req.query;
	try {
		const user = await User.findOne({ _id: req.uid });

		let chip = await Pet.findOne({
			chip,
		}).populate("user", "publicAddress");

		res.json({
			ok: true,
			chip,
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
		const find = await Pet.findOne({ chip: req.params.id }).populate(
			"user",
			"publicAddress"
		);

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
				user: req.uid,
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
	const find = await Pet.findOne({ chip: req.params.id }).populate(
		"user",
		"publicAddress"
	);

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

module.exports = {
	getRecord,
	saveRecord,
	updateRecord,
	deleteRecord,
	statusRecord,
};
