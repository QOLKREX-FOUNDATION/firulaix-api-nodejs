const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
	publicAddress: {
		type: String,
		required: true,
		unique: true,
	},
	nonce: {
		type: String,
		default: () => Math.floor(Math.random() * 1000000),
	},
	admin: {
		type: Boolean,
		default: false,
	},
	entityRegister: {
		country: {
			type: String,
		},
		document: {
			type: String,
		},
		documentNumber: {
			type: String,
		},
		name: {
			type: String,
		},
		direction: {
			type: String,
		},
		phone: {
			type: String,
		},
		email: {
			type: String,
		},
		idPermission: {
			type: [String],
		},
		accessValues: {
			type: [[String]],
		},
	},
	user: {
		name: {
			type: String,
		},
		lastName: {
			type: String,
		},
		local: {
			type: String,
		},
		position: {
			type: String,
		},
		accessValues: {
			type: [[String]],
		},

		email: {
			type: String,
		},
		phone: {
			type: String,
		},
		birthDate: {
			type: String,
		},
		gender: {
			type: String,
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
		typePerson: {
			type: String,
			default: "juridic",
		},
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

module.exports = model("User", UserSchema);
