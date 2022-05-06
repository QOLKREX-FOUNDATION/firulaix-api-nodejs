const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
	publicAddress: {
		type: String,
		required: true,
		unique: true,
	},
	nonce: {
		type: String,
        default:  () => Math.floor(Math.random() * 1000000),
	},
    rol: {
		type: String,
        ref: 'Rol',
        required: true,
    }
});

module.exports = model("User", UserSchema);


