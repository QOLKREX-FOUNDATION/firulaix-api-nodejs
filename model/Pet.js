const { Schema, model } = require("mongoose");

const PetSchema = new Schema({
	addressEr: {
		type: String,
	},
	userAddress: {
		type: String,
	},
	userName: {
		type: String,
	},
	adopter: {
		type: String,
	},
	adopterName: {
		type: String,
	},
	adopterLastName: {
		type: String,
	},
	dateRegistring: {
		type: Date,
	},
	name: {
		type: String,
	},
	race: {
		type: String,
	},

	gender: {
		type: String,
	},
	date: {
		type: Date,
	},
	dateAdoption: {
		type: Date,
	},
	dateIssue: {
		type: Date,
	},
	chip: {
		type: String,
		require: true,
		unique: true,
	},
	chipDate: {
		type: Date,
	},
	colour: {
		type: String,
	},
	image: {
		type: String,
	},
	pedigree: {
		type: String,
	},
	country: {
		type: String,
	},
	type: {
		type: String,
	},
	sterilized:{
		type: String,
	},
	hash: {
		type: String,
	},
	status: {
		type: String,
		default: "ACTIVE",
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	idRegisteringEntity: {
		type: Number,
	},
	created_for: {
		type: String,
	},
	created_at: {
		type: Date,
		default: new Date(),
	},
	update_for: {
		type: String,
	},
	update_at: {
		type: String,
	},
});

module.exports = model("Pet", PetSchema);
