const { Schema, model } = require("mongoose");

const AdopterSchema = new Schema({
	country: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	person: {
		type: String,
		required: true,
	},
	document: {
		type: String,
		required: true,
	},
	documentNumber: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	secondName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	mLastName: {
		type: String,
	},
	gender: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: {
		type: String,
		required: true,
	},
	department: {
		type: String,
	},
	province: {
		type: String,
	},
	district: {
		type: String,
	},
	direction: {
		type: String,
	},
	status: {
		type: Boolean,
		required: true,
	},
	idRegisteringEntity: {
		type: Number,
		required: true,
	},
	password: {
		type: String,
		select: false
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	created_for: {
		type: String,
	},
	created_at: {
		type: Date,
		default: new Date()
	},
	update_for: {
		type: String,

	},
	update_at: {
		type: String,
	},
	phoneCode: {
		type: Schema.Types.ObjectId,
		ref: "CodePhone",
		required: false,
	},
	nationality: {
		type: Schema.Types.ObjectId,
		ref: "CodePhone",
		required: false,
	},
});

module.exports = model("Adopter", AdopterSchema);
