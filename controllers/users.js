const { response } = require("express");
const {
	passwordDencrypt,
	passwordEncrypt,
} = require("../helpers/passwordEncrypt");
const Adopter = require("../model/Adopter");
const { generateJWT } = require("../helpers/jwt");
const { mailReset } = require("../helpers/mail");

const getRecord = async (req, res = response) => {
	try {
		const adopter = await Adopter.findOne({
			email: req.verifyCredential,
		}).select("-password");

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

const login = async (req, res = response) => {
	try {
		const find = await Adopter.findOne({ email: req.body.email }).select(
			"password email name lastName idRegisteringEntity"
		);
		const response = passwordDencrypt(req.body.password, find.password);

		if (!response) {
			return res.status(400).json({
				ok: false,
				msg: "authenticaiton fail",
			});
		}

		const token = await generateJWT(find._id, find.name, find.email);
		res.status(200).json({
			ok: true,
			token,
			adopter:find,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

const passwordUpdate = async (req, res = response) => {
	try {
		const find = await Adopter.findOne({ email: req.verifyCredential }).select(
			"password"
		);
		const response = passwordDencrypt(req.body.passwordOld, find.password);

		if (!response) {
			return res.status(400).json({
				ok: false,
				msg: "authenticaiton fail",
			});
		}

		req.body.password = passwordEncrypt(req.body.password, 10);

		await Adopter.findByIdAndUpdate(find._id, {
			password: req.body.password,
		});

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

const updateData = async (req, res = response) => {
	try {
		const find = await Adopter.findOne({ email: req.verifyCredential });

		await Adopter.findByIdAndUpdate(find._id, {
			phone: req.body.phone,
			department: req.body.department,
			province: req.body.province,
			district: req.body.district,
			direction: req.body.direction,
		});

		res.status(200).json({
			ok: true,
			adopter: req.body,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

const resetSendEmail = async (req, res = response) => {
	try {
		const find = await Adopter.findOne({ email: req.body.email });
		const token = await generateJWT(find._id, find.name, find.email);

		sendEmail = await mailReset({
			email: req.body.email,
			name: `${find.name} ${find.secondName} ${find.lastName} ${find.mLastName}`,
			token,
		});

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

const comprobeToken = async (req, res = response) => {
	res.status(200).json({
		ok: true,
	});
};

const passwordReset = async (req, res = response) => {
	try {
		const find = await Adopter.findOne({ email: req.verifyCredential });

		if (!find) {
			return res.status(400).json({
				ok: false,
				msg: "authenticaiton fail",
			});
		}
		req.body.password = passwordEncrypt(req.body.password, 10);

		await Adopter.findByIdAndUpdate(find._id, {
			password: req.body.password,
		});

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
	login,
	comprobeToken,
	getRecord,
	passwordUpdate,
	resetSendEmail,
	passwordReset,
	updateData,
};
