const { response } = require("express");
const Adopter = require("../model/Adopter");
const User = require("../model/User");

const getAddress = async (req, res = response) => {
	const { address } = req.query;
	try {
		let find = await Adopter.findOne({ address });
		let bandera = find.address ? true : false;
		res.status(201).json({
			ok: true,
			bandera,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

const getPublic = async (req, res = response) => {
	const { address } = req.query;
	try {
		let find = await Adopter.findOne({ address });

		if(!find.status) {
			res.status(400).json({
				ok: false,
			});
		}

		res.status(201).json({
			ok: true,
			phone: find.phone,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

const getEmail = async (req, res = response) => {
	const { email } = req.query;
	try {
		let find = await Adopter.findOne({ email });
		let bandera = find.email ? true : false;
		res.status(201).json({
			ok: true,
			bandera,
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
	const { country, document, documentNumber } = req.query;

	try {
		let adopters = await Adopter.findOne({
			country,
			document,
			documentNumber,
		}).select('-privateKey');

		const compare = await User.findById(
			String(adopters.user).toString()
		).populate("user", "publicAddress");
		const user = await User.findById(req.uid).populate("user", "publicAddress");

		if (
			String(user?.user?._id).toUpperCase() ==
				String(compare?.user?._id).toUpperCase() ||
			String(adopters.user).toString() == "000000000000000000000000"
		) {
			adopters = {
				...adopters._doc,
				idEntity: adopters._doc.idRegisteringEntity,
			};
		} else {
			adopters = {
				_id: adopters._id,
				country: adopters.country,
				type: adopters.type,
				person: adopters.person,
				document: adopters.document,
				documentNumber: adopters.documentNumber,
				address: adopters.address,
				name: adopters.name,
				secondName: adopters.secondName,
				lastName: adopters.lastName,
				mLastName: adopters.mLastName,
				user: {
					_id: adopters?.user?._id,
				},
				idRegisteringEntity: adopters.idRegisteringEntity,
				idEntity: adopters.idRegisteringEntity,
			};
		}

		res.json({
			ok: true,
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

const saveRecord = async (req, res = response) => {
	delete req.body._id;
	const adopter = new Adopter(req.body);
	let msg = "";
	let find = await Adopter.findOne({ email: req.body.email });
	find = await Adopter.findOne({ address: req.body.address });
	if (find) msg = "app.errorPost.emailDuplicate";
	if (find) msg = "app.errorPost.addressDuplicate";
	find = await Adopter.findOne({
		country: req.body.country,
		document: req.body.document,
		documentNumber: req.body.documentNumber,
	});
	if (find) msg = "warOffice.form.adopterForm.register";
	try {
		adopter.user = req.uid;
		if (msg!="") {
			return res.status(400).json({
				ok: false,
				msg: msg,
			});
		}

		const record = await adopter.save();

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
	let msg = "";
	try {
		const find = await Adopter.findById(req.params.id);

		const compare = await User.findById(String(find.user).toString()).populate(
			"user",
			"publicAddress"
		);

		const user = await User.findById(req.uid).populate("user", "publicAddress");

		if (!find) {
			return res.status(404).json({
				ok: false,
				msg: "No exist adopter",
			});
		}

		let validate = await Adopter.findOne({
			country: req.body.country,
			document: req.body.document,
			documentNumber: req.body.documentNumber,
			_id: { $ne: req.params.id},
		});
		if (validate) msg = "warOffice.form.adopterForm.register";

		 validate = await Adopter.findOne({
			address: req.body.address,
			_id: { $ne: req.params.id},
		});
		if (validate) msg = "app.errorPost.addressDuplicate";

		validate = await Adopter.findOne({
			email: req.body.email,
			_id: { $ne: req.params.id},
		});
		if (validate) msg = "app.errorPost.emailDuplicate";

		if (msg) {
			return res.status(400).json({
				ok: false,
				msg: msg,
			});
		}

		if (
			String(user?.user?._id).toUpperCase() ==
				String(compare?.user?._id).toUpperCase() ||
			String(find.user).toString() == "000000000000000000000000"
		) {
			await Adopter.findByIdAndUpdate(
				req.params.id,
				{
					...req.body,
					user:
						req.body.idRegisteringEntity == find.idRegisteringEntity
							? req.uid
							: "000000000000000000000000",
				},
				{ new: true }
			);

			res.status(200).json({
				ok: true,
			});
		} else {
			return res.status(404).json({
				ok: false,
				msg: "No permit",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

const deleteRecord = async (req, res = response) => {
	const find = await Adopter.findById(req.params.id);

	const compare = await User.findById(String(find.user).toString()).populate(
		"user",
		"publicAddress"
	);

	const user = await User.findById(req.uid).populate("user", "publicAddress");

	if (!find) {
		return res.status(404).json({
			ok: false,
			msg: "No exist adopter",
		});
	}

	if (
		String(user?.user?._id).toUpperCase() ==
			String(compare?.user?._id).toUpperCase() ||
		String(find.user).toString() == "000000000000000000000000"
	) {
		await Adopter.findByIdAndRemove(req.params.id);

		res.status(200).json({
			ok: true,
		});
	} else {
		return res.status(404).json({
			ok: false,
			msg: "No permit",
		});
	}
};

module.exports = {
	getPublic,
	getAddress,
	getEmail,
	getRecord,
	saveRecord,
	updateRecord,
	deleteRecord,
};
