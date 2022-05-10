const { response } = require("express");
const Adopter = require("../model/Adopter");
const User = require("../model/User");

const getRecord = async (req, res = response) => {
	const { country, document, documentNumber } = req.query;
	try {
		const user = await User.findOne({ _id: req.uid });

		let adopters = await Adopter.findOne({
			country,
			document,
			documentNumber,
		}).populate("user", "publicAddress");

		if (
			String(user.publicAddress).toUpperCase() !=
			String(adopters.user.publicAddress).toUpperCase()
		) {
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
					_id: adopters.user._id,
				},
				idRegisteringEntity: adopters.idRegisteringEntity,
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
	let msg="";
	try {
		adopter.user = req.uid;

		let  find = await Adopter.findOne({ address: req.body.address });
		if(find) msg = "app.errorPost.addressDuplicate";

		find = await Adopter.findOne({ email: req.body.email });
		if(find) msg= "app.errorPost.emailDuplicate"

		if(msg){
			res.status(400).json({
				ok: false,
				msg: msg
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
	try {
		const find = await Adopter.findById(req.params.id).populate(
			"user",
			"publicAddress"
		);
		const user = await User.findOne({ _id: req.uid });

		if (!find) {
			return res.status(404).json({
				ok: false,
				msg: "No exist adopter",
			});
		}

		if (find.user._id.toString() !== req.uid) {
			return res.status(404).json({
				ok: false,
				msg: "No permit",
			});
		}

		if (
			String(user.publicAddress).toUpperCase() ==
			String(find.user.publicAddress).toUpperCase()
		) {
			await Adopter.findByIdAndUpdate(
				req.params.id,
				{
					...req.body,
					user: req.uid,
				},
				{ new: true }
			);
		}

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
	const find = await Adopter.findById(req.params.id).populate(
		"user",
		"publicAddress"
	);

	const user = await User.findOne({ _id: req.uid });

	if (!find) {
		return res.status(404).json({
			ok: false,
			msg: "No exist adopter",
		});
	}

	if (find.user._id.toString() !== req.uid) {
		return res.status(404).json({
			ok: false,
			msg: "No permit",
		});
	}
	if (
		String(user.publicAddress).toUpperCase() ==
		String(find.user.publicAddress).toUpperCase()
	) {
		await Adopter.findByIdAndRemove(req.params.id);
	}

	res.status(200).json({
		ok: true,
	});
};

module.exports = {
	getRecord,
	saveRecord,
	updateRecord,
	deleteRecord,
};
