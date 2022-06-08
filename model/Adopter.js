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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

module.exports = model("Adopter", AdopterSchema);
