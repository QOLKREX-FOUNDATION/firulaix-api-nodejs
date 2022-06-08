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
	ad: {
		type: Boolean,
		default:false
    },
	er: {
		type: Boolean,
		default:false
    },
	us: {
		type: Boolean,
		default:false
    },
	user: {
		type: Boolean,
		default:false
    },
	created: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

module.exports = model("User", UserSchema);


