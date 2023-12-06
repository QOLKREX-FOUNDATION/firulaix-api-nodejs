const { response } = require("express");
const { mail } = require("../helpers/mail");
const { passwordEncrypt } = require("../helpers/passwordEncrypt");
const Adopter = require("../model/Adopter");
const User = require("../model/User");

const getAddress = async (req, res = response) => {
	const { address, id } = req.query;
	try {
		let find = await Adopter.findOne({ address });

		let bandera =
			find.email && String(find?._id).toUpperCase() !== String(id).toUpperCase()
				? true
				: false;
		return res.status(201).json({
			ok: true,
			bandera,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

// search adopter by documentNumber
const getAdopterByDocumentNumber = async (req, res = response) => {
	const { documentNumber } = req.params;

	console.log({ documentNumber });

	try {
		const adopter = await Adopter.findOne({ documentNumber });

		if (!adopter) {
			return res.status(404).json({
				ok: false,
				msg: "The adopter does not exist",
			});
		}

		return res.status(200).json({
			ok: true,
			adopter,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error inesperado... revisar logs",
		});
	}
};

const getPublic = async (req, res = response) => {
	const { address } = req.query;
	try {
		let find = await Adopter.findOne({ address });
		if (!find) {
			return res.status(400).json({
				ok: false,
			});
		}

		if (!find?.status) {
			return res.status(400).json({
				ok: false,
			});
		}

		return res.status(201).json({
			ok: true,
			phone: find.phone,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

const getEmail = async (req, res = response) => {
	const { email, id } = req.query;
	try {
		let find = await Adopter.findOne({ email });
		console.log(find.email)
		console.log(find?._id)
		console.log(find.email && String(find?._id).toUpperCase())
		let bandera =
			find.email && String(find?._id).toUpperCase() !== String(id).toUpperCase()
				? true
				: false;
		return res.status(201).json({
			ok: true,
			bandera,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

const getRecordAddress = async (req, res = response) => {
	let { address } = req.query;
	try {
		let adopters = await Adopter.findOne({
			address,
		});

		adopters = {
			address: adopters.address,
			name: adopters.name,
			secondName: adopters.secondName,
			lastName: adopters.lastName,
			mLastName: adopters.mLastName,
		};

		res.json({
			ok: true,
			adopters,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
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
		return res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

const saveRecord = async (req, res = response) => {
	delete req.body._id;
	if (req.body?.password) {
		req.body.passwordText = req.body.password;
		req.body.password = passwordEncrypt(req.body.password, 10);
	}
	req.body.created_for = req.body.userAddress;
	const adopter = new Adopter(req.body);

	let msg = "";
	let find = await Adopter.findOne({ email: req.body.email });
	if (find) msg = "app.errorPost.emailDuplicate";
	find = await Adopter.findOne({ address: req.body.address });
	if (find) msg = "app.errorPost.addressDuplicate";

	find = await Adopter.findOne({
		country: req.body.country,
		document: req.body.document,
		documentNumber: req.body.documentNumber,
	});
	if (find) msg = "warOffice.form.adopterForm.register";
	try {
		adopter.user = req.uid;
		if (msg != "") {
			return res.status(400).json({
				ok: false,
				msg: msg,
			});
		}

		const record = await adopter.save();
		let sendEmail = false;
		if (req.body?.sendEmail) {
			console.log("sendEmail")
			sendEmail = await mail({
				email: req.body.email,
				password: req.body.passwordText,
				address: req.body.address,
				privateKey: req.body.privateKey,
			});
		}

		return res.status(201).json({
			ok: true,
			data: record,
			sendEmail,
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
			_id: { $ne: req.params.id },
		});
		if (validate) msg = "warOffice.form.adopterForm.register";

		validate = await Adopter.findOne({
			address: req.body.address,
			_id: { $ne: req.params.id },
		});
		if (validate) msg = "app.errorPost.addressDuplicate";

		validate = await Adopter.findOne({
			email: req.body.email,
			_id: { $ne: req.params.id },
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

			// Crear una copia de req.body excluyendo explícitamente el campo 'password'
			const updatedData = { ...req.body };
			delete updatedData.password;

			await Adopter.findByIdAndUpdate(
				req.params.id,
				{
					...updatedData,
					update_for: req.body.userAddress,
					update_at: new Date(),
					user:
						req.body.idRegisteringEntity == find.idRegisteringEntity
							? req.uid
							: "000000000000000000000000",
				},
				{ new: true }
			);

			return res.status(200).json({
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
		return res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

const updateDocumentAdopter = async (req, res = response) => {
	let msg = "";
	console.log({ req: req.params.id });
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
			// Crear una copia de req.body excluyendo explícitamente el campo 'password'
			const updatedData = { ...req.body };
			delete updatedData.password;

			await Adopter.findByIdAndUpdate(
				req.params.id,
				{
					country: updatedData.country,
					person: updatedData.person,
					document: updatedData.document,
					documentNumber: updatedData.documentNumber,
				},
				{ new: true }
			);

			return res.status(200).json({
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

		return res.status(200).json({
			ok: true,
		});
	} else {
		return res.status(404).json({
			ok: false,
			msg: "No permit",
		});
	}
};

const getHistory = async (req, res = response) => {
	try {
		const { created_for } = req.query.created_for;
		let adopters = await Adopter.find({ created_for });
		return res.status(201).json({
			ok: true,
			adopters,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

const getAdopterByEmailOrName = async (req, res = response) => {
	const { search } = req.params;

	const { email = "true", name = "true", limit = 10, offset = 0 } = req.query;
	console.log("search", search);
	console.log("search", { email, name });
	console.log({ limit, offset });

	const isEmail = email === "true";
	const isName = name === "true";

	try {
		if (!search) {
			return res.status(400).json({
				ok: false,
				msg: "The search is required",
			});
		}

		const query = { $or: [] };

		if (isEmail) {
			query.$or.push({
				email: { $regex: search.toUpperCase(), $options: "i" },
			});
		}

		if (isName) {
			query.$or.push(
				{ name: { $regex: search.toUpperCase(), $options: "i" } },
				{ secondName: { $regex: search.toUpperCase(), $options: "i" } },
				{ lastName: { $regex: search.toUpperCase(), $options: "i" } },
				{ mLastName: { $regex: search.toUpperCase(), $options: "i" } }
			);
		}

		console.log({ query });

		if (query.$or.length === 0) {
			return res.status(200).json({
				ok: false,
				msg: "No criteria for search provided",
			});
		}

		const formTotal = await Adopter.find(query);

		const form = await Adopter.find(query).limit(limit).skip(offset);

		// si no encuentra el formulario
		if (form.length === 0) {
			return res.status(200).json({
				ok: false,
				msg: "The form does not exist",
			});
		}

		console.log("totalResults", formTotal.length);
		console.log("form", form.length);
		return res.status(200).json({
			ok: true,
			total: form.length,
			totalResults: formTotal.length,
			currentPage: offset,
			form,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error inesperado... revisar logs",
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
	getRecordAddress,
	getHistory,
	getAdopterByEmailOrName,
	getAdopterByDocumentNumber,
	updateDocumentAdopter
};
