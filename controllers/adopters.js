const { response } = require("express");
const Adopter = require("../model/Adopter");
const User = require("../model/User");

const getRecord = async (req, res = response) => {
	const { country, document, documentNumber } = req.query;

	try {
		let adopters = await Adopter.findOne({
			country,
			document,
			documentNumber,
		});

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
	try {
		adopter.user = req.uid;

		let find = await Adopter.findOne({ address: req.body.address });
		if (find) msg = "app.errorPost.addressDuplicate";

		find = await Adopter.findOne({ email: req.body.email });
		if (find) msg = "app.errorPost.emailDuplicate";

		if (msg) {
			res.status(400).json({
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
	getRecord,
	saveRecord,
	updateRecord,
	deleteRecord,
};
